'use client';

import React from 'react';
import PageGuard from '../../../../PageGuard';
import { usePageTheme } from '../../../../hooks/usePageTheme';
import { PageHeader } from '@/components/ui/src/page-header';
import { SectionHeader } from '@/components/ui/src/sectionHeader';
import PiratesHomeLink from '@/app/components/PiratesHomeLink';

export default function CountiresAndLanguages() {
  const { backgroundClass, textClass } = usePageTheme();

  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[white] dark:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PiratesHomeLink />
        <PageHeader
          title="Mostly true stores of the crew"
          description="Backgrounds n' such"
        />
        <main className="py-4 flex flex-col">
          <div className={sectionClass}>
            <SectionHeader
              title="The Crew"
              subtitle="This page contains information on PC members of the crew."
            />
          </div>
            {/* <h1 className="text-2xl font-bold tracking-tight mt-2 text-slate-900 dark:text-amber-100">Witches and Sorcerers</h1> */}
          <div className={sectionClass}>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Mad Morgan</h2>
            <p>
              Mad Morgan was raised in the Academies by her parents who wanted her to become an educated woman and 
              marry into a noble house.  Her parents, minor nobles were firm supporters of the arts (notably music - 
              hence the name) and learning institutions.  Both were accomplished scholars and sought only the finest 
              education and learnings for their only child.  However Morgan (She hated her first name) wanted more 
              out of life than to spend all her days in a lecture hall and so sought after skills and knowledge that 
              could make her independent from her parents and the responsibilities of her house.  
            </p>
            <p>
              As a liberated woman who sought to one day to seek out fame and fortune she took advantage of the 
              muskeet training at the academy, much to the chagrin of her parents who thought it too unladylike.  
              However Morgan was strong willed and insisted that the world was a dangerous place and that she needed 
              to have some form of self-defense.  Her parents argued that the Academies were perfectly safe, but 
              yielded to their daughter in this one regard.                
            </p>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Books in the 
              Surging Seas Series</h2>
            <p>
              A series of books written by Page Turner that in no way are related to Mad Morgan
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A Seaman's Tale</li>
              <li>The Storms of Tomorrow</li>
              <li>Abreast of Destiny</li>
              <li>Deepwater Danger</li>
              <li>When the Snatch Block Breaks</li>
              <li>Legends of Terror</li>
            </ul>
         </div>
        </main>
      </div>
    </PageGuard>
  );
}