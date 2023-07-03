// Icons
import { RC as WaterIcon } from "./assets/icons/water.svg";
import { RC as EarthIcon } from "./assets/icons/earth.svg";
import { RC as FireIcon } from "./assets/icons/fire.svg";
import { RC as AirIcon } from "./assets/icons/air.svg";

// Badges
import EarlyAdopterBadge from "./assets/badges/early-adopter-100.png";

import FirstPlantBadge from "./assets/badges/plant-100.png";
import FirstHerbBadge from "./assets/badges/herb-100.png";
import FirstFruitBadge from "./assets/badges/fruit-100.png";
import FirstFlowerBadge from "./assets/badges/flower-100.png";
import FirstVegetableBadge from "./assets/badges/vegetable-100.png";
import AllPlantTypesBadge from "./assets/badges/all-plants-100.png";

import FirstCreatureBadge from "./assets/badges/creature-100.png";
import FirstWaterCreatureBadge from "./assets/badges/water-100.png";
import FirstEarthCreatureBadge from "./assets/badges/earth-100.png";
import FirstFireCreatureBadge from "./assets/badges/fire-100.png";
import FirstAirCreatureBadge from "./assets/badges/air-100.png";
import AllElementsBadge from "./assets/badges/all-elements-100.png";

import BeeAvatar from "./assets/avatars/bee-100.png";
import BeetleAvatar from "./assets/avatars/beetle-100.png";
import ButterflyAvatar from "./assets/avatars/butterfly-100.png";
import DragonflyAvatar from "./assets/avatars/dragonfly-100.png";
import GrasshopperAvatar from "./assets/avatars/grasshopper-100.png";
import LadybugAvatar from "./assets/avatars/ladybug-100.png";
import RhinoBeetleAvatar from "./assets/avatars/rhinoceros-beetle-100.png";

export const elements: WefaElement[] = ["WATER", "EARTH", "AIR", "FIRE"];

interface WefaElementData {
  name: string;
  description: string;
  image: string;
  color: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export const elementData: Record<WefaElement, WefaElementData> = {
  WATER: {
    name: "Water",
    description: "Change, Adaptability, and Flexibility.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#3F88DE",
    Icon: WaterIcon,
  },
  EARTH: {
    name: "Earth",
    description: "Substance, Stability, and Rigidity.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#74564A",
    Icon: EarthIcon,
  },
  FIRE: {
    name: "Fire",
    description: "Power, Assertiveness, and Passion.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#A82D26",
    Icon: FireIcon,
  },
  AIR: {
    name: "Air",
    description: "Freedom, Expansion, and Movement.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#F4B53F",
    Icon: AirIcon,
  },
};

export const elementColors: Record<WefaElement, string> = {
  WATER: "#3F88DE",
  EARTH: "#74564A",
  FIRE: "#A82D26",
  AIR: "#F4B53F",
};

export const plantColors: Record<PlantType, string> = {
  flower: "#fbbf24",
  fruit: "#f59e0b",
  herb: "#f472b6",
  vegetable: "#10b981",
};

export const rankColors: Record<WefaRank, string> = {
  0: "#ffffff",
  1: "#fbbf24",
  2: "#f59e0b",
  3: "#10b981",
  4: "#3b82f6",
  5: "#9c4224",
  6: "#111827",
  7: "#f87171",
  8: "#dc2626",
};

export const rankNames: Record<WefaRank, string> = {
  0: "White",
  1: "Yellow",
  2: "Orange",
  3: "Green",
  4: "Blue",
  5: "Brown",
  6: "Black",
  7: "Red-White",
  8: "Red",
};

export const badges: Record<BadgeType, WefaBadge> = {
  "1st-plant": {
    id: "1st-plant",
    name: "First Plant",
    description: "You planted your first plant!",
    Icon: FirstPlantBadge,
  },
  "1st-flower": {
    id: "1st-flower",
    name: "First Flower",
    description: "You planted your first flower!",
    Icon: FirstFlowerBadge,
  },
  "1st-fruit": {
    id: "1st-fruit",
    name: "First Fruit",
    description: "You planted your first fruit!",
    Icon: FirstFruitBadge,
  },
  "1st-herb": {
    id: "1st-herb",
    name: "First Herb",
    description: "You planted your first herb!",
    Icon: FirstHerbBadge,
  },
  "1st-vegetable": {
    id: "1st-vegetable",
    name: "First Vegetable",
    description: "You planted your first vegetable!",
    Icon: FirstVegetableBadge,
  },
  "all-plant-types": {
    id: "all-plant-types",
    name: "All Plant Types",
    description: "You have planted a plant of each type!",
    Icon: AllPlantTypesBadge,
  },
  "1st-creature": {
    id: "1st-creature",
    name: "First Creature",
    description: "You created your first creature!",
    Icon: FirstCreatureBadge,
  },
  "all-elements": {
    id: "all-elements",
    name: "All Elements",
    description: "You have created a creature of each element!",
    Icon: AllElementsBadge,
  },
  "1st-water-creature": {
    id: "1st-water-creature",
    name: "First Water Creature",
    description: "You created your first water creature!",
    element: "WATER",
    Icon: FirstWaterCreatureBadge,
  },
  "1st-earth-creature": {
    id: "1st-earth-creature",
    name: "First Earth Creature",
    description: "You created your first earth creature!",
    element: "EARTH",
    Icon: FirstEarthCreatureBadge,
  },
  "1st-fire-creature": {
    id: "1st-fire-creature",
    name: "First Fire Creature",
    description: "You created your first fire creature!",
    element: "FIRE",
    Icon: FirstFireCreatureBadge,
  },
  "1st-air-creature": {
    id: "1st-air-creature",
    name: "First Air Creature",
    description: "You created your first air creature!",
    element: "AIR",
    Icon: FirstAirCreatureBadge,
  },
  "early-adopter": {
    id: "early-adopter",
    name: "Early Adopter",
    description: "You joined Wefa before launch!",
    Icon: EarlyAdopterBadge,
  },
};

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomAvatar(): string {
  // Check local storage for avatar
  const avatar = localStorage.getItem("avatar");
  if (avatar) {
    return avatar;
  }

  const avatars = [
    BeeAvatar,
    BeetleAvatar,
    ButterflyAvatar,
    DragonflyAvatar,
    GrasshopperAvatar,
    LadybugAvatar,
    RhinoBeetleAvatar,
  ];

  const randomAvatar = pickRandom(avatars);

  localStorage.setItem("avatar", randomAvatar);

  return randomAvatar;
}

export const avatar = generateRandomAvatar();

export {
  WaterIcon,
  EarthIcon,
  FireIcon,
  AirIcon,
  EarlyAdopterBadge,
  FirstPlantBadge,
  FirstHerbBadge,
  FirstFruitBadge,
  FirstFlowerBadge,
  FirstVegetableBadge,
  AllPlantTypesBadge,
  FirstCreatureBadge,
  FirstWaterCreatureBadge,
  FirstEarthCreatureBadge,
  FirstFireCreatureBadge,
  FirstAirCreatureBadge,
  AllElementsBadge,
};
