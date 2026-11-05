'use client';

import { PageHeader } from '../../../components/ui/src/page-header';
import PageGuard from '../../PageGuard';
import { SectionHeader } from '../../../components/ui/src/sectionHeader';
import { ImageGalleryCard } from '../../../components/ui/src/image-gallery-card';

export default function GamingCentralPage() {
  const diceTowerImages = [
    { url: "https://i.imgur.com/nKPQXFV.jpeg", alt: "Nice straight on view of dice tower" },
    { url: "https://i.imgur.com/nUQ9mOl.jpeg", alt: "Overhead view of dice tower" },
    { url: "https://i.imgur.com/wksXOnD.jpeg", alt: "Side view of dice tower" }
  ]
  const cryptImages = [
    { url: "https://i.imgur.com/8tBo0HI.jpeg", alt: "Top down view of a bunch of crypt terrain" },
    { url: "https://i.imgur.com/NQqhsH9.jpeg", alt: "The entryway" },
    { url: "https://i.imgur.com/dW4FBPj.jpeg", alt: "The entryway showing the secret door" },
    { url: "https://i.imgur.com/RCogrWW.jpeg", alt: "A characters eye view" },
    { url: "https://i.imgur.com/G8spmWK.jpeg", alt: "A view with the portcullis up" },
    { url: "https://i.imgur.com/BFWI0Z2.jpeg", alt: "A bone wall" },
    { url: "https://i.imgur.com/BHC5erO.jpeg", alt: "A large crypt room" },
    { url: "https://i.imgur.com/7Q4QR0h.jpeg", alt: "A long hallway with crypts" }
  ]
  const modules = [
    { url: "/the_rats_in_the_cradle_generic.jpg", alt: "The Rats in the Cradle Module" },
  ]

  // Standardized classes for full mobile width and expanded desktop width
  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="Gaming Central"
        description="Where we talk about, well game stuff."
      />
      {/* Wrapping the content blocks inside a main tag provides structured page-level layout constraints */}
      <main className="py-4 flex flex-col">

        <div className={sectionClass}>
          <SectionHeader
            title="Misc Nonsense"
            subtitle="I was fooling around with the idea of creating game logs in the form of D&D modules. It takes too much time to be practical but I'm doing to do it every once in awhile."
          // divider={true}
          />
          <a
            href="/the_rats_in_the_cradle_generic.pdf"
            aria-label="Open The Rats in the Cradle PDF"
          >
          <ImageGalleryCard
            heading="Homemade Modules"
            bodyText="This is my first serious attempt at making something that looked like an old-school module."
            images={modules}
            columns={1}
          />
          </a>
        </div>

        <div className={sectionClass}>

          <SectionHeader
            title="Dungeon Terrain"
            subtitle="I 3D print and paint rather a lot of terrain for my game. Here's a sample."
          // divider={true}
          />

          <ImageGalleryCard
            heading="Dice Tower"
            bodyText="This is one of my earliest prints. I made it for on of my kids"
            images={diceTowerImages}
            columns={3}
          />

          <div className="h-4" aria-hidden="true"></div>

          <ImageGalleryCard
            heading="Crypts"
            bodyText="This set terrified my players"
            images={cryptImages}
            columns={4}
          />
        </div>

      </main>
    </PageGuard>
  );
}
