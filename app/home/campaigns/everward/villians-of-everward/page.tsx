import React from 'react';
import fs from 'fs';
import path from 'path';
import PageGuard from "../../../../PageGuard";
import EverwardHomeLink from '../../../../components/EverwardHomeLink';
import { TextRegistryClientWrapper } from '@/app/components/TextRegistryClientWrapper';

async function loadLogsFromDirectory(dirRelativePath: string, baseFileName: string) {
  const absoluteDir = path.join(process.cwd(), dirRelativePath);

  try {
    if (!fs.existsSync(absoluteDir)) return [];
    const files = fs.readdirSync(absoluteDir);

    // Filter by files starting with your target prefix (e.g., 'history-')
    const matchingFiles = files.filter(file => file.startsWith(baseFileName) && file.endsWith('.txt'));

    const parsedSections = matchingFiles.map((file) => {
      const filePath = path.join(absoluteDir, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');

      const metaIndex = rawContent.indexOf('---');
      let metaBlock = '';
      let bodyBlock = rawContent;

      if (metaIndex !== -1) {
        metaBlock = rawContent.substring(0, metaIndex);
        bodyBlock = rawContent.substring(metaIndex + 3);
      }

      const lines = metaBlock ? metaBlock.trim().split('\n') : [];
      const titleLine = lines.find(l => l.startsWith('Title:'))?.replace('Title:', '').trim();
      const taglineLine = lines.find(l => l.startsWith('Tagline:'))?.replace('Tagline:', '').trim();

      // Look for this line inside your page.tsx file mapping loop:
      return {
        id: file.replace('.txt', ''),
        title: titleLine || file.replace('.txt', ''),
        tagline: taglineLine || undefined,

        // FIX HERE: This removes tab characters at the start of any lines
        markdownBody: bodyBlock ? bodyBlock.trim().replace(/^\t+/gm, '') : rawContent.trim().replace(/^\t+/gm, '')
      };

    });

    return parsedSections.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  } catch (error) {
    console.error("Failed to parse Everward history logs:", error);
    return [];
  }
}

export default async function EverwardHistoryLedgerPage() {
  // Target the public/data/everward path and scan for files starting with 'history-'
  const rawSections = await loadLogsFromDirectory('public/data/everward', 'history-');

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      {/* 
        Inject configuration parameters dynamically. The layout wrapper uses your 
        usePageTheme() hook behind the scenes to switch to amber highlights, 
        amber borders, and parchment paper container styles!
      */}
      <TextRegistryClientWrapper
        serverLoadedSections={rawSections}
        pageTitle="Districts & History Ledger"
        pageDescription="An archival registry of historical council decisions, municipal boundaries, and asset declarations."
        sidebarHeading="History Ledger Index"
        homeLinkComponent={<EverwardHomeLink />}
      />
    </PageGuard>
  );
}
