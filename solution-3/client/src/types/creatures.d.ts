declare type CreatureBadgeType =
  | "1st-creature"
  | "all-elements"
  | "1st-water-creature"
  | "1st-earth-creature"
  | "1st-fire-creature"
  | "1st-air-creature";

declare interface Creature extends Identity, Asset, Timestamps, LocalProps {
  id: `0x${string}`; // Address
  trainer: `0x${string}`; // Address
  spaceId: string; // Bytes32 ID
  element: WefaElement;
  // health: Health;
  // care: Care;
  // spaceAddress: `0x${string}`; // Address
}
