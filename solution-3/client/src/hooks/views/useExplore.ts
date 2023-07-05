import {
  PlantVerifierDataProps,
  usePlantVerifier,
} from "../plants/usePlantVerifier";

export interface ExploreDataProps extends PlantVerifierDataProps {}

export const useExplore = (): ExploreDataProps => {
  const seed = usePlantVerifier();

  return {
    ...seed,
  };
};
