declare type WefaElement = "WATER" | "EARTH" | "FIRE" | "AIR";

declare enum WefaRank {
  WHITE,
  YELLOW,
  ORANGE,
  GREEN,
  BLUE,
  BROWN,
  BLACK,
  RED_WHITE,
  RED,
}

declare enum GrowthLevel {
  SEED,
  BUDDING,
  FLOWERING,
  RIPENING,
}

declare enum Size {
  MINI,
  SMALL,
  MEDIUM,
  LARGE,
}

declare interface Identity {
  name: string;
  description?: string;
  // createdAt?: number;
}

declare interface LocalProps {
  localId: string;
  isUploaded: boolean;
}

declare interface Asset {
  image: string; // CID
  model?: string; // CID
}

declare interface Timestamps {
  createdAt: number;
  updatedAt: number;
}

declare interface Care {
  growthLevel: GrowthLevel;
  checkedAt: number;
}
