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
          title="Fighting Schools"
          description="Or how to win friends and injure people..."
        />
        <main className="py-4 flex flex-col">
          <div className={sectionClass}>
            <SectionHeader
              title="Overview"
              subtitle="This page contains information on specialized fighting schools."
            />
          </div>

          <div className={sectionClass}>
            <h1 className="text-2xl font-bold tracking-tight mt-2 text-slate-900 dark:text-amber-100">Schools of fencing</h1>
            <p>The information on the various schools in this page represent a set of skills and abilities available to characters who are accepted
              to any individual school (in game).</p>

            <div className="mt-4 flex flex-col gap-4 leading-relaxed opacity-95 text-slate-900 dark:text-amber-50">

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Cobra Marine (Elycia)</h2>
              <p>Founded by Captain Dillard Rothbottom formerly of the Elycian Royal Navy, he allows Naval and "worthy" non naval personnel to learn 
                this form of combat. With extraordinary references he would allow non Elycians to learn it as well.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Can reload a pistol or musket in one full action.</li>
                <li>Enemies at any close range do not get their parry and require only a 4 to hit.</li>
                <li><strong>Secret:</strong> Can fire a musket, drop it and attack with a sword at no penalty OR can fire a pistol, move, and attack with a sword/another pistol at no penalty.</li>
              </ul>

              <hr />

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Strathmore School of Self Defence (Elycia)</h2>
              <p>Taught to physicians in good standing at the Strathmore Medical Academy to students who expect to spend considerable time abroad.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>They can not be poisoned so long as they are conscious when any poison or venom is applied</li>
                <li>If they are well versed in the anatomy of a foe and succeed in a 'trick' they gain an additional d6 damage</li>
                <li>They receive +2 to parry if they are armed with a knife or a surgical implement</li>
                <li>Any surgical implement is not considered an improvised weapon and my be wielded without penalty</li>
              </ul>

              <hr />

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Bear Skin (Boreland)</h2>
              <p>This isn't a school so much as a series of initiation rites applied to the toughest sailors from Boreland. If they can endure all of 
                the trials (and not many do) they are considered Bear Skins who then share fighting techniques between each other. Candidates for the 
                Bear Skins must have a d10 Vigor, a Swimming skill at d6, and a Fighting skill of d10. They earn the following benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>They can purchase the Tough As Nails and Improved Tough As Nails edges at any level</li>
                <li>They gain a +2 to all Soak rolls and checks on recovery from being shaken</li>
                <li><strong>Secret:</strong> Gain 1 die rank of Strength per wound taken</li>
              </ul>

              <hr />

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Fleur de lis (Marehard)</h2>
              <p>This school of fencing was invented by Alex Craimant, formerly of the King's Musketeers. Anyone of noble birth 
                can be trained in the school as well as anyone who has a distinguished career in any branch of Marehards military. 
                The following benefits are available:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The Dodge edge or Improved Dodge edge if the character already has Dodge</li>
                <li>The Block edge or Improved Block edge if the character already has Block</li>
                <li><strong>Secret:</strong> Fleet Footed edge</li>
              </ul>

              <hr />

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Espada Rapida (Casteel)</h2>
              <p>Founded by Emelio Chimichanga this school focus is on rapid strikes.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Riposte: When using the maneuver Full Defense if the defender is not hit by the attacker, he may make a free attack roll with a weapon in either hand.</li>
                <li>Lunge: A melee attack gains 1" reach. Parry is reduced by 2.</li>
                <li><strong>Secret:</strong> After a successful melee attack an attacker may make a second attack roll with the same weapon at -2.</li>
              </ul>

              <hr />

              <h2 className="text-xl font-bold tracking-tight mt-4 text-slate-900 dark:text-amber-100">Luta de Arpao or Harpoon Fighting (Lisbon)</h2>
              <p>Founded by an unsung Lisbonian whaler, this fighting technique is passed down from teacher to pupil as various teachers see fit. It 
                is fought with a harpoon though a spear can be used as well. </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>If an attack does a wound the attacker may opt to have the opponent impaled on the attackers weapon. If the attack was a general 
                  attack, a body shot, or a leg shot the defender and attacker can't move from their current locations unless the attacker drops/removes 
                  the harpoon or the defender make an opposed Strength or Agility roll against the attacker. In addition the attacker gets a free 
                  damage roll against a defender who attempts to free himself. If the defender succeeds on the opposed roll to free himself then he has 
                  freed himself from impalement and no damage is done. If it was a called shot to the arms, the defender can't use that arm unless they 
                  make an opposed roll as above. This doesn't work with head shots. Note that this makes additional attacks with the harpoon/spear 
                  nearly impossible.</li>
                <li>The attacker can use a harpoon or spear in tight quarters (below decks) without a -2 penalty.</li>
                <li><strong>Secret:</strong> May use the Advance First Strike edges when an opponent moves within 1" and again when moving adjacent 
                  allowing two attacks against the same opponent.</li>
              </ul>

            </div>
          </div>
        </main>
      </div>
    </PageGuard>
  );
}