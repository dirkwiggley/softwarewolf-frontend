const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const standaloneDir = path.join(projectRoot, '.next', 'standalone');
const staticDir = path.join(projectRoot, '.next', 'static');
const publicDir = path.join(projectRoot, 'public');
const finalZipPath = path.join(projectRoot, 'softwarewolf-frontend.zip');

// Clean staging area to match standard Next.js standalone specification
const stagingDir = path.join(projectRoot, 'hostinger_staging');

console.log('--- Assembling Pure Flat Production Archive Bundle ---');

// 1. Clean up old staging folders
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// 2. Verify that Next.js standalone directory exists
if (!fs.existsSync(standaloneDir)) {
  console.error('Error: Standalone directory not found.');
  process.exit(1);
}

// 3. COPY ENTIRE STANDALONE ENGINE UNTOUCHED: 
fs.cpSync(standaloneDir, stagingDir, { recursive: true });

// 4. EMBED STATIC ASSETS MULTI-PATH MATRIX:
// Next.js lookups require static bundles to reside inside .next/static on the server,
// but the background proxy routes asset lookups through an unhidden public routing zone.
// We write them to BOTH locations to guarantee 100% compliance across all server layers.
console.log('Embedding public assets and static CSS chunks...');
const targetPublicDir = path.join(stagingDir, 'public');
const targetStaticDir = path.join(stagingDir, '.next', 'static');

// Crucial: Create an unhidden public application asset folder right at the zip root level
const unhiddenNextAssetRoute = path.join(stagingDir, 'public', '_next', 'static');
fs.mkdirSync(unhiddenNextAssetRoute, { recursive: true });

if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, targetPublicDir, { recursive: true });
}

if (fs.existsSync(staticDir)) {
  // Map static chunks straight to the internal framework directory
  fs.mkdirSync(targetStaticDir, { recursive: true });
  fs.cpSync(staticDir, targetStaticDir, { recursive: true });

  // Map the exact same static chunks straight to your unhidden public asset route layer!
  fs.cpSync(staticDir, unhiddenNextAssetRoute, { recursive: true });
}

// 5. Update the package manifest properties so Hostinger executes Next's server natively
const nestedPackageJsonPath = path.join(stagingDir, 'package.json');
if (fs.existsSync(nestedPackageJsonPath)) {
  try {
    const pkgData = JSON.parse(fs.readFileSync(nestedPackageJsonPath, 'utf8'));
    pkgData.main = "server.js"; 
    pkgData.scripts = { start: "node server.js" };
    fs.writeFileSync(nestedPackageJsonPath, JSON.stringify(pkgData, null, 2));
    console.log('✓ Verified native execution trackers.');

    // Generate a standard .htaccess configuration flag to lock down styling content types
    const htaccessContent = `
<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
</IfModule>
    `;
    fs.writeFileSync(path.join(stagingDir, '.htaccess'), htaccessContent.trim());
  } catch (err) {}
}

// 6. BYPASS WINDOWS HIDDEN FILE LOCKS NATIVELY:
console.log('Compressing final flat standalone archive package...');
try {
  if (fs.existsSync(finalZipPath)) {
    fs.unlinkSync(finalZipPath);
  }
  
  // Use native PowerShell Archive commands to preserve hidden folders perfectly 
  const psCommand = `powershell -Command "Get-ChildItem -Path '${stagingDir}' -Force | Compress-Archive -DestinationPath '${finalZipPath}' -Force"`;
  execSync(psCommand);
  console.log('✓ Archive created cleanly with dual-bound framework assets.');
  
  // Clean up local staging workspace
  fs.rmSync(stagingDir, { recursive: true, force: true });
} catch (error) {
  console.error('Failed to create deployment zip archive:', error);
  process.exit(1);
}

console.log('\n=== SUCCESS ===');
console.log('Pristine standalone frontend.zip generated at: ' + finalZipPath);
