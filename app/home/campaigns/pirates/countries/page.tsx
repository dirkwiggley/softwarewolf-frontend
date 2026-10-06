'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageGuard from '../../../../PageGuard';
import { PageHeader } from '../../../../../components/ui/src/page-header';
import { SectionHeader } from '../../../../../components/ui/src/sectionHeader';
import { usePageTheme } from '../../../../hooks/usePageTheme';
import PiratesHomeLink from '@/app/components/PiratesHomeLink';

export default function PortsOfCall() {
  const router = useRouter();

  // Consume your centralized layout page styling context properties
  const { backgroundClass, textClass } = usePageTheme();

  // Standardized classes for full mobile width and expanded desktop width
  // Note: Added a dark mode specific linear-gradient overlay to soften the parchment texture when dark mode is toggled!
  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PiratesHomeLink />
        <PageHeader
          title="Pirates Campaign"
          description="Initial campaign notes."
        />

        {/* Wrapping the content blocks inside a main tag provides structured page-level layout constraints */}
        <main className="py-4 flex flex-col">

          {/* Overview Section */}
          <div className={sectionClass}>
            <SectionHeader
              title="Overview"
              subtitle="First time players should read this."
            />
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed opacity-95 text-slate-900 dark:text-amber-50">

              <p>Boiler plate lorum ipsum etc...</p>
            </div>
          </div>

          <div className={sectionClass}>
            <SectionHeader
              title="Countries of the world"
              subtitle="A bit about the major players in the world."
            />
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed opacity-95 text-slate-900 dark:text-amber-50">
              <h2>Major Naval Powers</h2>
              <ul>
                <li>Kingdom of Elicya (equivalent to England)</li>
                <li>Kingdom of Marehard (equivalent to France)</li>
                <li>Kingdom of Boreland (equivalent to the Netherlands)</li>
                <li>Kingdom of Casteel (equivalent to Spain)</li>
              </ul>
              <h2>Other Powers</h2>
              <ul>
                <li>Frankland (Germany)</li>
                <li>Lisbon (Portugal)</li>
                <li>Paese Del Vino (Italy)</li>
                <li>Adrakon (Rarely seen mysterious mages)</li>
              </ul>
              <p>The relationships between the countries are as contentious as their real world counterparts.</p>
              <p>There is one human kingdom without a real world counterpart, Adrakon, a kingdom of wizards. It
                lies at the Eastern end of the known world and no one has ventured into their territory and
                returned. On rare occasion, ships and travelers from Adrakon venture into the wider world.</p>
              <p>Magic exists but is rare. Most folk are fearful of it and it is often officially or unofficially
                suppressed, most notably in Casteel where it is outlawed by decree and those who practice it are
                hunted. However, all governments have mages in the court, though their true nature might be
                hidden. See the section on magic for more info.</p>
              <p>Races include human, elf, orc, merfolk, lizard folk, and a few others. For the most part there
                is little contact between humans and other races but it does occur. </p>
              <p>Half orcs are the offspring of orcs and another species. They may be raised in either culture but
                are often at a great disadvantage as in orcish cultures they are considered weak and in other
                cultures they are considered brutish. Suffering through this usually makes half orcs difficult to
                deal with as they tend to have a chip on their shoulder, expecting to have to prove themselves at
                every turn. There are exceptions but such individuals are usually the result of an unconventional
                upbringing.</p>
              <h2>Languages</h2>
              <ul>
                <li>Elicyian - Elycia</li>
                <li>Mareish - Marehard</li>
                <li>Borish - Boreland</li>
                <li>Castellian - Casteel</li>
                <li>Frank - Frankland</li>
                <li>Lisbonian - Lisbon</li>
                <li>Delphic (Greek, dead language used by scholars)</li>
                <li>Eirlandian (elf)</li>
                <li>Aural (elf)</li>
                <li>Galron (orc)</li>
                <li>Luxor (orc)</li>
                <li>Harrah (orc)</li>
                <li>Frieza (orc)</li>
                <li>Mook (orc)</li>
                <li>Mako (merfolk)</li>
                <li>Shough (merfolk)</li>
                <li>Madara (lizardfolk)</li>
                <li>High Adrakon</li>
                <li>Low Adrakon</li>
              </ul>
            </div>
          </div>

        </main>
      </div>
    </PageGuard >
  );
}
