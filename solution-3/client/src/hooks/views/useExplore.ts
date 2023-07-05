import { SeedDataProps, useSeed } from "../plants/usePlantVerifier";

export interface ExploreDataProps extends SeedDataProps {}

export const useExplore = (): ExploreDataProps => {
  const seed = useSeed();

  return {
    ...seed,
  };
};
