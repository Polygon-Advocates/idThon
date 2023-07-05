declare type WefaElement = "WATER" | "EARTH" | "FIRE" | "AIR";

declare interface Identity {
  name: string;
  description?: string;
  // createdAt?: number;
}

declare interface Asset {
  image: string; // CID
  model?: string; // CID
}
