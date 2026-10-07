/* ==========================================================================
   MARKDOWN LOG WRITING CHEAT SHEET (For your .txt files)
   ==========================================================================
   
   PARAGRAPHS:
   Leave an entire empty blank line between blocks of text to create a paragraph.
   
   HEADINGS:
   ## Small Header (Maps to <h2>)
   ### Mini Header  (Maps to <h3>)
   
   TEXT HIGHLIGHTS:
   **Bold Text**         -> Great for items, actions, or names.
   *Italic Text*         -> Great for flavor text, rumors, or speech.
   ~~Strikethrough~~     -> Great for crossed-out ledger balances.
   `inline code`         -> Great for mechanical stats or dice rules like `1d20 + 4`.
   
   LISTS (Leave an empty line before starting a list):
   - Bullet item one
   - Bullet item two
   
   1. Numbered item one
   2. Numbered item two
   
   BLOCKQUOTES (Great for letters or scrolls found by players):
   > "To whoever finds this map, the treasure is buried beneath..."
   
   TABLES (Great for inventory or loot splits):

   | Item Name       | Value    | Weight |
   | --------------- | -------- | ------ |
   | Flintlock Pistol| 50 gold  | 3 lbs  |
   | Iron Cutlass    | 15 gold  | 4 lbs  |
   
   ========================================================================== */
'use client';

import React from 'react';
import { usePageTheme } from '../hooks/usePageTheme';
import { SimpleTextRegistryViewer, SimpleSection } from '@/components/ui/src/simple-text-registry-viewer';
import { marked } from 'marked';
import { PageHeader } from '@/components/ui/src/page-header';

interface ParsedServerLogSection {
  id: string;
  title: string;
  tagline?: string;
  markdownBody: string;
}

interface TextRegistryClientWrapperProps {
  serverLoadedSections: ParsedServerLogSection[];
  pageTitle: string;
  pageDescription?: string;
  sidebarHeading?: string;
  homeLinkComponent?: React.ReactNode;
}

export function TextRegistryClientWrapper({ 
  serverLoadedSections,
  pageTitle,
  pageDescription = "A historical ledger index of compiled campaign documentation.",
  sidebarHeading = "Document Index",
  homeLinkComponent
}: TextRegistryClientWrapperProps) {
  
  const { backgroundClass, textClass, ledgerContainerClass } = usePageTheme();

  const formattedSections: SimpleSection[] = serverLoadedSections.map((sec) => {
    const htmlString = marked.parse(sec.markdownBody) as string;

    return {
      id: sec.id,
      title: sec.title,
      tagline: sec.tagline,
      // INJECT MARKS FOR FULL-TEXT CONTENT SEARCH LOGIC:
      searchText: sec.markdownBody,
      content: (
        <div 
          className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-800 dark:text-zinc-300
                     [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:whitespace-nowrap
                     [&_table]:md:table [&_table]:md:w-full [&_table]:md:whitespace-normal
                     [&_th]:text-left [&_th]:font-bold [&_th]:px-4 [&_th]:py-3 [&_th]:border-b-2 [&_th]:border-current/20 [&_th]:bg-transparent
                     [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top 
                     [&_tr]:border-b [&_tr]:border-current/10 [&_tr:nth-child(even)]:bg-current/5"
          dangerouslySetInnerHTML={{ __html: htmlString }} 
        />
      )
    };
  });

  return (
    <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
      {homeLinkComponent}
      <PageHeader title={pageTitle} description={pageDescription} />

      <main className="py-4 px-0 md:px-4">
        <div className={ledgerContainerClass}>
          {formattedSections.length > 0 ? (
            <SimpleTextRegistryViewer 
              sections={formattedSections}
              sidebarHeading={sidebarHeading}
            />
          ) : (
            <p className="italic text-center text-xs py-8 text-slate-400">
              No matching ledger logs discovered inside public asset directories.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
