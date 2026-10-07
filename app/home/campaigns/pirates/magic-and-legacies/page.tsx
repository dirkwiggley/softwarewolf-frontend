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
          title="Magic and Legacies"
          description="The occult and worse..."
        />
        <main className="py-4 flex flex-col">
          <div className={sectionClass}>
            <SectionHeader
              title="Overview"
              subtitle="This page contains information on magic and magic-like abilities."
            />
          </div>

          <div className={sectionClass}>
            <p>There are several options for characters looking to possess magical or supernatural abilities 
              in the campaign. The most common forms that magic use takes in the campaign are witchcraft, 
              sorcery, legacies, shamanism, and weird science.</p>
            <p>Both witchcraft and sorcery are mechanically the same. Both use the Arcane Background (Magic) 
              Edge but the philosophy behind witchcraft and sorcery are so different as to make the practice 
              seem like distinct disciplines. These philosophies are generalizations and individual 
              practitioners will have their own nuanced versions of these. That said, when meeting a 
              practitioner of the arcane arts, one can make the following assumptions:</p>

            <h1 className="text-2xl font-bold tracking-tight mt-2 text-slate-900 dark:text-amber-100">Witches and Sorcerers</h1>
            <ul className="list-disc pl-5 space-y-1">
              <li>Are <strong>no longer</strong> subject to twists of ill fortune as are people near them.</li>
              <li>Are shunned by society with some exceptions.</li>
              <li>Live solitary lives.</li>
              <li>Closely guard the secrets of their magics.</li>
              <li>Have a strong distrust bordering on hostility towards other practitioners.</li>
              <li>Death Curse: Both witches and sorcerers have the ability to cast a powerful curse upon their 
                death or prior to their death whose power is proportional to the power of the witch/sorcerer 
                casting the curse.</li>
              <li><strong>No longer</strong> must take the major hindrance "Mage" which is a strong form of 
              unluck.</li>
            </ul>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Witches</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Magics are usually tied to nature or natural effects.</li>
              <li>Live in solitary conditions usually in the wilderness. As a result they are often depicted in 
                local lore as being hags but this is more a result of a lack of fresh clothes are hygiene products.</li>
              <li>Are not all female.</li>
              <li>A part of a creed held by all witches, they will take on young, untrained people with magical 
                talent to train until they are self sufficient. Then they will be sent out and expected to survive 
                on their own. These 'apprentices' might or might not be subject to the general mistrust or hostility 
                after they leave.</li>
              <li>Witches may band together for brief periods for self defense or to achieve some greater goal. They 
                may form permanent relationships with other witches but will always hold one another at a distance.</li>
              <li>Do not assume witches are all nice. Very few actually are.</li>
            </ul>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Sorcerers</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Will never trust one another sufficiently to work together.</li>
              <li>Are not all male.</li>
              <li>Can be found anywhere. Powerful, confident sorcerers will find a position in a royal court where their 
                occupation will be under the protection of a king or his officers. Others might hide their true vocation 
                while living in a city or live in seclusion.</li>
              <li>Can capture the souls of other magic users to fuel their own powers and occasionally hunt one another.</li>
              <li>Are eventually compelled to take on an apprentice to train who will eventually be killed by the 
                sorcerer or who will kill his master. Once in awhile both survive the apprenticeship.</li>
              <li>Do not assume all sorcerers are all evil. Most of them are.</li>
            </ul>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Shamanism</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Includes alchemy.</li>
              <li>Works straight out of the book.</li>
              <li>Not recommended for PCs.</li>
            </ul>

            <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Legacies</h2>
            <p>Legacies are people who have received some powers from an ancestor. They take the Background (Gifted) 
              Edge and the following generalizations can be made about them:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>They have an ancestor who had a similar power.</li>
              <li>The are almost always the only person in that generation with the legacy power.</li>
              <li>The backstory of the power is a good read.</li>
            </ul>
          </div>
        </main>
      </div>
    </PageGuard>
  );
}