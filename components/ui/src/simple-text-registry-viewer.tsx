'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';

export interface SimpleSection {
  id: string;
  title: string;
  tagline?: string;
  content: React.ReactNode;
  searchText?: string; // NEW: Holds the raw text used for the full-text search index
}

interface SimpleTextRegistryViewerProps {
  sections: SimpleSection[];
  sidebarHeading?: string;
}

export function SimpleTextRegistryViewer({
  sections,
  sidebarHeading = "Ledger Index"
}: SimpleTextRegistryViewerProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  // 1. DYNAMIC COLOR SCHEME CLASSES FOR ACTIVE PATHS
  let borderClass = 'border-slate-200 dark:border-slate-800';
  let labelClass = 'text-slate-500 dark:text-slate-400';
  let italicDescClass = 'text-slate-500 dark:text-slate-400';
  
  // Input Box & Sidebar Button Variants
  let selectClass = 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 focus:ring-slate-500';
  let activeBtnClass = 'bg-slate-200/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-l-2 border-slate-700 dark:border-slate-400';
  let inactiveBtnClass = 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100';

  if (pathname.startsWith('/home/campaigns/everward')) {
    borderClass = 'border-amber-900/10 dark:border-amber-100/10';
    labelClass = 'text-amber-950/70 dark:text-amber-200/70';
    selectClass = 'border-amber-900/30 bg-amber-50/80 dark:bg-zinc-900 text-slate-900 dark:text-amber-50 focus:ring-amber-700 dark:focus:ring-amber-500';
    italicDescClass = 'text-amber-800 dark:text-amber-400';
    activeBtnClass = 'bg-amber-900/10 dark:bg-amber-100/10 text-amber-900 dark:text-amber-200 font-bold border-l-2 border-amber-700 dark:border-amber-500';
    inactiveBtnClass = 'text-slate-700 dark:text-amber-100/60 hover:bg-amber-900/5 dark:hover:bg-amber-100/5 hover:text-slate-900 dark:hover:text-amber-50';
  } else if (pathname.startsWith('/home/campaigns/pirates')) {
    borderClass = 'border-teal-900/10 dark:border-teal-100/10';
    labelClass = 'text-teal-950/70 dark:text-teal-200/70';
    selectClass = 'border-stone-200 bg-stone-50/80 dark:bg-slate-900 text-stone-900 dark:text-teal-50 focus:ring-teal-700 dark:focus:ring-teal-500';
    italicDescClass = 'text-teal-800 dark:text-teal-400';
    activeBtnClass = 'bg-teal-900/10 dark:bg-teal-100/10 text-teal-900 dark:text-teal-200 font-bold border-l-2 border-teal-700 dark:border-teal-500';
    inactiveBtnClass = 'text-stone-700 dark:text-teal-100/60 hover:bg-teal-900/5 dark:hover:bg-teal-100/5 hover:text-stone-900 dark:hover:text-teal-50';
  }

  // 2. FULL-TEXT SEARCH FILTER FILTER ENGINE
  const filteredSections = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return sections;

    return sections.filter((section) => {
      const matchTitle = section.title.toLowerCase().includes(cleanQuery);
      const matchTagline = section.tagline?.toLowerCase().includes(cleanQuery) || false;
      const matchBody = section.searchText?.toLowerCase().includes(cleanQuery) || false;

      return matchTitle || matchTagline || matchBody;
    });
  }, [searchQuery, sections]);

  // Adjust selection if the current item is filtered out
  const activeSection = filteredSections.find(s => s.id === activeId) || filteredSections[0];

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">

      {/* SIDEBAR BLOCK (SEARCH + LISTS) */}
      <aside className={`w-full md:w-1/4 flex flex-col gap-3 shrink-0 border-b md:border-b-0 md:border-r ${borderClass} pb-5 md:pb-0 md:pr-4`}>
        
        {/* Unified Search Input Field Box */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="ledger-search" className={`text-xs font-bold uppercase tracking-wider ${labelClass}`}>
            Search Ledger
          </label>
          <input
            id="ledger-search"
            type="text"
            placeholder="Search titles, logs, or terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full p-2 text-sm rounded border focus:outline-none focus:ring-2 transition-shadow duration-150 ${selectClass}`}
          />
        </div>

        {/* Mobile Filtered Dropdown Selector View */}
        <div className="block md:hidden w-full mt-1">
          <label htmlFor="mobile-index-selector" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${labelClass}`}>
            {sidebarHeading} ({filteredSections.length})
          </label>
          <select
            id="mobile-index-selector"
            value={activeSection?.id || ''}
            onChange={(e) => setActiveId(e.target.value)}
            className={`w-full p-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow duration-150 ${selectClass}`}
            disabled={filteredSections.length === 0}
          >
            {filteredSections.length > 0 ? (
              filteredSections.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))
            ) : (
              <option>No matches discovered...</option>
            )}
          </select>
        </div>

        {/* Desktop Navigation Link Column Layout */}
        <div className="hidden md:flex flex-col gap-1 mt-1">
          <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${labelClass}`}>
            {sidebarHeading} ({filteredSections.length})
          </span>
          {filteredSections.length > 0 ? (
            filteredSections.map(s => {
              const isActive = s.id === activeSection?.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded font-medium transition-all duration-150 truncate ${
                    isActive ? activeBtnClass : inactiveBtnClass
                  }`}
                >
                  {s.title}
                </button>
              );
            })
          ) : (
            <p className="text-xs italic p-2 text-slate-400 dark:text-zinc-500">No logs match your filter terms.</p>
          )}
        </div>
      </aside>

      {/* CORE RUNTIME CONTENT ENGINE DISPLAY VIEWPORT */}
      <section className="flex-1 flex flex-col gap-4 pt-2 md:pt-0">
        {activeSection ? (
          <>
            <div className={`border-b ${borderClass} pb-3`}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                {activeSection.title}
              </h2>
              {activeSection.tagline && (
                <p className={`text-xs italic mt-1 leading-normal ${italicDescClass}`}>
                  {activeSection.tagline}
                </p>
              )}
            </div>
            
            <div className="mt-1 text-sm leading-relaxed px-0.5 md:px-0">
              {activeSection.content}
            </div>
          </>
        ) : (
          <div className="w-full text-center py-12 border border-dashed rounded opacity-60">
            <p className="text-sm">No section fits the provided filter query criteria.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs underline mt-2 text-teal-600 dark:text-amber-400 block mx-auto"
            >
              Clear search query filter
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
