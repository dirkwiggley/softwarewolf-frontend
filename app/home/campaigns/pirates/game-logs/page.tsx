import React from 'react';
import fs from 'fs';
import path from 'path';
import PageGuard from "../../../../PageGuard";
import PiratesHomeLink from '@/app/components/PiratesHomeLink';
import { TextRegistryClientWrapper } from '@/app/components/TextRegistryClientWrapper';

async function loadLogsFromDirectory(dirRelativePath: string, baseFileName: string) {
  const absoluteDir = path.join(process.cwd(), dirRelativePath);

  try {
    if (!fs.existsSync(absoluteDir)) return [];
    const files = fs.readdirSync(absoluteDir);
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
    console.error("Failed to parse logs:", error);
    return [];
  }
}

export default async function PiratesGameLogsPage() {
  const rawSections = await loadLogsFromDirectory('public/data/pirates', 'log-');

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      {/* 
        Inject configuration parameters dynamically. This layout engine will adapt 
        its theme parameters natively based on its route context hooks!
      */}
      <TextRegistryClientWrapper
        serverLoadedSections={rawSections}
        pageTitle="Pirate Captain Logs"
        pageDescription="A chronological archive of high-seas operations, loot trackers, and plunder reports."
        sidebarHeading="Log Index"
        homeLinkComponent={<PiratesHomeLink />}
      />
    </PageGuard>
  );
}
