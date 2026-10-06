import { RegistrySectorData } from "../../../../components/CampaignRegistryViewer";

export const EVERWARD_DISTRICTS: RegistrySectorData[] = [
  {
    id: "palace-district",
    name: "Palace District",
    tagline: "Seat of the High Crown",
    description: "The court where the highest levels of intrigue take place.",
    locations: [
      {
        name: "The Royal Palace",
        description:
          "The majestic seat of authority housing the High Crown, the Privy Council chambers, and court retainers.",
        subLocations: [
          {
            name: "Quiet Chambers",
            targets: [
              {
                name: "Marquis Bluejon de Blackjack",
                description: "His Majesties confidential assistant",
              },
            ],
          },
          {
            name: "The Privy Council",
            targets: [
              {
                name: "Count Rufus J Perriwinkle",
                description: "Lord High Chamberlain",
              },
              {
                name: "Tellar",
                description: "Assistant to the Royal Magician",
              },
              {
                name: "Duke Boswick Curmudgeon",
                description: "Chancellor of the Exchequer",
              },
            ],
          },
          {
            name: "The Royal Court & Musicians",
            targets: [
              {
                name: "Roady Piper",
                description: "Assistant to the Royal Musicians",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "merchant-district",
    name: "Merchant District",
    tagline: "Bazaars, Guilds, and Trading Hubs",
    description:
      "The administrative and mercantile engine of Everward where trade compacts are signed, municipal laws are enforced, and gold changes hands constantly.",
    locations: [
      {
        name: "Merchant District Boss",
        description: "The top dogs of the district.",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Burt Strong", description: "Underboss" },
        ],
      },
      {
        name: "High Market",
        description: "The Emeralds",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "Guild Row",
        description: "The Smiths",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "Gardens",
        description: "The Florists",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "Guilded Park",
        description: "The Rangers",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "star-street",
    name: "Star Street",
    tagline: "The red light district",
    description:
      "A colorful, thoroughfare featuring esoteric shops, localized street vendors, alcoves of recreation, and specialized alchemical labs.",
    locations: [
      {
        name: "Star Street District Boss",
        description: "The top dogs of the district.",
        targets: [
          { name: "Juan Demarco", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "North End",
        description: "Star Street",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "The Red Light Block",
        description:
          "The Bombasts",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "the-emerald-quarter",
    name: "The Emerald Quarter",
    tagline: "The Noble Estates",
    description:
      "The opulent upper-crust residential neighborhood featuring sprawling manors, private aristocratic parks, and exclusive estates.",
    locations: [
      {
        name: "Emerald Quarter District Boss",
        description: "The top dogs of the district.",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "the-commons",
    name: "The Commons",
    tagline: "Heart of the Populace",
    description:
      "Densely populated residential zone for working citizens, bustling local shops, and academic halls.",
    locations: [
      {
        name: "The Commons Boss",
        description: "The top dogs of the district.",
        targets: [
          { name: "Lucre Spendthrift", description: "Overboss" },
          { name: "Wastrel Goodes", description: "Underboss" },
        ],
      },
      {
        name: "The Sanitorium",
        description: "Sawbones",
        targets: [
          { name: "'Doctor' Kildare", description: "Overboss" },
          { name: "'Nurse' Chapel", description: "Underboss" },
        ],
      },
      {
        name: "The Small Market",
        description: "Butchers",
        targets: [
          { name: "Al Owen", description: "Overboss" },
          { name: "Turk Shute", description: "Underboss" },
        ],
      },
      {
        name: "West Side",
        description: "Tar Barrell Boys",
        targets: [
          { name: "Dilbert Forman", description: "Overboss" },
          { name: "Harriet Owen", description: "Underboss" },
        ],
      },
      {
        name: "East Side",
        description: "Barrel Breakers",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "the-canals",
    name: "The Canals",
    tagline: "Waterways & Waterborne Trade",
    description:
      "Long aquatic channels stringing the city segments together, populated by industrial workhouses, stables, and tight-lipped canal guards.",
    locations: [
      {
        name: "The Canals Boss",
        description: "Top dogs of the district",
        targets: [
          { name: "Jenna Getcha", description: "Overboss" },
          { name: "Grue Somme", description: "Underboss" },
        ],
      },
      {
        name: "Near Docks",
        description: "Damp Fellas",
        targets: [
          { name: "Deborah Drowner", description: "Overboss" },
          { name: "Peid Rott", description: "Underboss" },
        ],
      },
      {
        name: "Mid Canals",
        description: "Copper Swipers",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "Canal Ends",
        description: "Undertows",
        targets: [
          { name: "Cooper Leaky", description: "Overboss" },
          { name: "Chet Chat", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "the-docs",
    name: "The Docs",
    tagline: "The Shipping Harbor",
    description:
      "Where coastal trading galleons, massive naval vessels, and local fishing skiffs anchor along the busy waterfront.",
    locations: [
      {
        name: "The Docs Boss",
        description: "Top dogs of the district",
        targets: [
          { name: "Don 'Bark' Scuttle", description: "Overboss" },
          { name: "Ketch Upperton", description: "Underboss" },
        ],
      },
      {
        name: "The Canals Border",
        description: "Breakers",
        targets: [
          { name: "'Don Don' Donogal", description: "Overboss" },
          { name: "Finster Fab", description: "Underboss" },
        ],
      },
      {
        name: "Upper Docs",
        description: "Fish Heads",
        targets: [
          { name: "Buster 'Fishwife' Femer", description: "Overboss" },
          { name: "Constance Payne", description: "Underboss" },
        ],
      },
      {
        name: "Lower Docks",
        description: "The Chums",
        targets: [
          { name: "Cleary Maddie", description: "Overboss" },
          { name: "Brutus Strong", description: "Underboss" },
        ],
      },
      {
        name: "Ramshackle Row",
        description: "Scruffy Rats",
        targets: [
          { name: "Carrie Waters", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
    ],
  },
  {
    id: "the-lilac-quarter",
    name: "The Lilac Quarter",
    tagline: "Entertainment & Nightlife",
    description:
       'Ironically named section of town containing tanneries, abattiors and such.',
    locations: [
      {
        name: "Lilac Quarter Boss",
        description: "The top dogs of the district",
        targets: [
          { name: "Unknown", description: "Overboss" },
          { name: "Unknown", description: "Underboss" },
        ],
      },
      {
        name: "Ramshackle Row",
        description: "Blackjacks",
        targets: [
          { name: "June 'Gal' George", description: "Overboss" },
          { name: "Gyt Somme", description: "Underboss" },
        ],
      },
      {
        name: "Flea Market",
        description: "Scruffy Boys",
        targets: [
          { name: "Hugh Jass 'Skunk'", description: "Overboss" },
          { name: "Olaf Key", description: "Underboss" },
        ],
      },
      {
        name: "Stables",
        description: "Horse Flies",
        targets: [
          { name: "Alfalfa", description: "Overboss" },
          { name: "Harry Farier", description: "Underboss" },
        ],
      },
    ],
  },
];
