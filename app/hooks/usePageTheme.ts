'use client';

import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export interface PageTheme {
  backgroundClass: string;
  textClass: string;
  combined: string;
  cardClass: string;
  // NEW: Sets the specific background styling for ledger/index containers
  ledgerContainerClass: string; 
}

export function usePageTheme(): PageTheme {
  const pathname = usePathname();
  const { theme } = useSecurity();
  const isDark = theme === 'dark';

  // Base layout wrapper tokens shared by all ledger variants
  const baseContainer = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] p-4 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  // 1. Admin Section
  if (pathname.startsWith('/admin-hub')) {
    return {
      backgroundClass: isDark ? 'bg-slate-950' : 'bg-slate-50',
      textClass: isDark ? 'text-slate-100' : 'text-slate-900',
      combined: isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
      cardClass: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
      ledgerContainerClass: `${baseContainer} ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`,
    };
  }

  // 2. Everward Campaign Section (Uses custom parchment image overlay)
  if (pathname.startsWith('/home/campaigns/everward')) {
    return {
      backgroundClass: isDark ? 'bg-amber-950' : 'bg-amber-100',
      textClass: isDark ? 'text-amber-100' : 'text-slate-900',
      combined: isDark ? 'bg-amber-950 text-amber-100' : 'bg-amber-100 text-slate-900',
      cardClass: 'bg-wolf-panel border-wolf-panel',
      ledgerContainerClass: `${baseContainer} bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/parchment.jpg')] bg-cover bg-center`,
    };
  }

  // 3. Pirates Campaign Section (Uses pure white on light, deep tint on dark)
  if (pathname.startsWith('/home/campaigns/pirates')) {
    return {
      backgroundClass: isDark ? 'bg-slate-950' : 'bg-stone-100',
      textClass: isDark ? 'text-teal-100' : 'text-stone-900',
      combined: isDark ? 'bg-slate-950 text-teal-100' : 'bg-stone-100 text-stone-900',
      cardClass: isDark ? 'bg-slate-900/40 border-teal-900/20' : 'bg-white/80 border-stone-200',
      ledgerContainerClass: `${baseContainer} ${isDark ? 'bg-slate-900/60 border border-teal-950/40' : 'bg-white border border-stone-200'}`,
    };
  }

  // 4. DEFAULT THEME
  return {
    backgroundClass: isDark ? 'bg-slate-950' : 'bg-slate-50',
    textClass: isDark ? 'text-slate-100' : 'text-slate-900',
    combined: isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
    cardClass: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    ledgerContainerClass: `${baseContainer} ${isDark ? 'bg-slate-900' : 'bg-white border border-slate-200'}`,
  };
}
