'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageGuard from '../../../PageGuard';
import { usePageTheme } from '../../../hooks/usePageTheme';
import { PageHeader } from '@/components/ui/src/page-header';
import { SectionHeader } from '@/components/ui/src/sectionHeader';
import PiratesHomeLink from '@/app/components/PiratesHomeLink';

export default function PiratesHomePage() {
  const router = useRouter();
  
  // Consume your centralized layout page styling context properties
  const { backgroundClass, textClass, cardClass } = usePageTheme();

  // Uniform width class matching the exact horizontal profile of the Everward layout
  const widthContainerClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%]";

  const TEAL_TAG = {tagColor: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20"};
  const ROSE_TAG = {tagColor: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20"};
  const AMBER_TAG = {tagColor: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"};

  const PIRATE_MODULES = [
    {
      id: "01",
      title: "Countires and Languages",
      description: "A list of important countries and languages players may encounter.",
      tag: "Campaign Info",
      ...TEAL_TAG,
      btnText: "Speaking Slowly →",
      action: () => router.push('/home/campaigns/pirates/countries'),
    },
    {
      id: "02",
      title: "The Crew and Ships Manifest",
      description: "A list of PCs in the game.",
      tag: "Character Info",
      ...ROSE_TAG,
      btnText: "Checking the roster →",
      action: () => router.push('/home/campaigns/pirates/crew-and-manifest'),
    },
    {
      id: "03",
      title: "Character Portraits",
      description: "Doodles of the dudles",
      tag: "Character Info",
      ...ROSE_TAG,
      btnText: "Appreciating Art →",
      action: () => alert(`Picking up the sketch pad...`),
    },        
    {
      id: "04",
      title: "Game Logs",
      description: "Logs of high adventure.",
      tag: "Campaign Info",
      ...TEAL_TAG,
      btnText: "Chronicaling Carefully →",
      action: () => router.push('/home/campaigns/pirates/game-logs'),
    },        
    {
      id: "5",
      title: "Messages",
      description: "Postings from various locations.",
      tag: "CLUES AND LEADS",
      ...AMBER_TAG,
      btnText: "Check Message Board →",
      action: () => alert("Checkin the tavern wall.'...")
    },
    {
      id: "6",
      title: "Ports of Call & Strongholds",
      description: "A comprehensive map directory of black market havens, hidden coves, and naval blockades.",
      tag: "Islands Map",
      ...TEAL_TAG,
      btnText: "Chart Route →",
      action: () => alert("Plotting navigation lines across the map...")
    },
    {
      id: "7",
      title: "Fighting Schools",
      description: "A collection of esoteric fighting arts.",
      tag: "CATALOG",
      ...AMBER_TAG,
      btnText: "Equipping Weapons →",
      action: () => router.push('/home/campaigns/pirates/fighting-schools'),
      // alert("Readying weapons..."),
    },
    {
      id: "8",
      title: "Magic and Legacies",
      description: "Weird and scary powers.",
      tag: "DESCRIPTIONS",
      ...AMBER_TAG,
      btnText: "Boo →",
      action: () => router.push('/home/campaigns/pirates/magic-and-legacies'),
    },
    {
      id: "9",
      title: "Known ships and captains",
      description: "Profiles of active deckhands, trusted officers, and targeted pirate hunters.",
      tag: "Campaign Info",
      ...TEAL_TAG,
      btnText: "Salts of all sorts →",
      action: () => alert("Scoffing at information...")
    }
  ];

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        
        <PageHeader
          title="The Pirates Campaign"
          description="Navigate the treacherous waters, track pirate crew allegiances, and manage your privateer fleets."
        />

        <div className="pt-2 flex flex-col gap-6">
          
          {/* Section Header Content */}
          <div className={`${widthContainerClass} px-4 md:px-0`}>
            <SectionHeader
              title="Navigational Operations Hub"
              subtitle="Review your vessel metrics, active charts, and coastal rumors."
              divider={true}
            />
          </div>

          {/* Grid Content Matrix - Utilizing matching wide layout constraints */}
          <div className={`${widthContainerClass} px-4 md:px-0`}>
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              {PIRATE_MODULES.map((module) => (
                <section 
                  key={module.id} 
                  className={`flex flex-col justify-between p-6 border rounded-xl shadow-md ${cardClass} hover:shadow-lg transition-all duration-200`}
                >
                  <div>
                    {/* Thematic Category Indicator Badges */}
                    <div className="mb-4 inline-flex items-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${module.tagColor}`}>
                        {module.tag}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight mb-2 dark:text-teal-50">
                      <span className="font-mono text-sm opacity-40 mr-2">{module.id}</span>
                      {module.title}
                    </h2>
                    
                    <p className="text-sm leading-relaxed opacity-75 mb-6 text-slate-700 dark:text-slate-300">
                      {module.description}
                    </p>
                  </div>

                  {/* Nautical Theme Button: Deep Teal palette matching marine privateer profiles */}
                  <button 
                    onClick={module.action} 
                    className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors duration-150 cursor-pointer"
                  >
                    {module.btnText}
                  </button>
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>
    </PageGuard>
  );
}