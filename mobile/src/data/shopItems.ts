import type { Reward } from "@/src/types";

export const shopItems: Reward[] = [
  {
    id: "moon-desk",
    name: "Moonwood Desk",
    slot: "desk",
    cost: 40,
    level: 1,
    color: "#9A704F",
    description: "A small desk made for big ideas.",
  },
  {
    id: "star-lamp",
    name: "Golden Star Lamp",
    slot: "lamp",
    cost: 55,
    level: 1,
    color: "#F3C875",
    description: "Warm light for late-afternoon review.",
  },
  {
    id: "glow-fern",
    name: "Glow Fern",
    slot: "leftPlant",
    cost: 35,
    level: 1,
    color: "#8FD7B5",
    description: "A curious fern that glows after study sessions.",
  },
  {
    id: "comet-flower",
    name: "Comet Flower",
    slot: "rightPlant",
    cost: 60,
    level: 2,
    color: "#EAA5B7",
    description: "Its petals trail tiny specks of light.",
  },
  {
    id: "orbit-books",
    name: "Orbit Bookshelf",
    slot: "bookshelf",
    cost: 90,
    level: 2,
    color: "#9D91E8",
    description: "A curved shelf for Sprig’s field guides.",
  },
  {
    id: "tiny-scope",
    name: "Pocket Observatory",
    slot: "largeStructure",
    cost: 140,
    level: 3,
    color: "#76B7D7",
    description: "A tiny observatory for studying distant ideas.",
  },
  {
    id: "star-satchel",
    name: "Scholar Satchel",
    slot: "sprigAccessory",
    cost: 75,
    level: 2,
    color: "#F3C875",
    description: "Carries pencils, flashcards, and one mysterious seed.",
  },
  {
    id: "meteor-shower",
    name: "Gentle Meteor Shower",
    slot: "skyEffect",
    cost: 180,
    level: 4,
    color: "#F7F1E4",
    description: "A quiet sky effect for the garden.",
  },
];

export function rewardForSession(seed: number, durationMinutes: number) {
  const eligible = shopItems.filter(
    (item) => item.cost <= 40 + durationMinutes * 3,
  );
  return (
    eligible[Math.abs(seed) % Math.max(eligible.length, 1)] ?? shopItems[0]
  );
}
