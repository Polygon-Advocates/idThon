import { SeedDataProps, useSeed } from "../wefa/useSeed";

export interface ExploreDataProps extends SeedDataProps {}

export const useExplore = (): ExploreDataProps => {
  const seed = useSeed();

  return {
    ...seed,
  };
};
