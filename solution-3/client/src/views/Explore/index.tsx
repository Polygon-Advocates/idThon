import { ExploreDataProps } from "../../hooks/views/useExplore";

import { PlantDetector } from "../../components/WEFA/PlantDetector";
import { CreatureGeneration } from "../../components/WEFA/CreatureGeneration";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({
  creature,
  error,
  plantingState,
  isDetecting,
  isSeeding,
  verifyPlant,
  plant,
  reset,
}) => {
  return (
    <section className="explore-view flex-col px-6 sm:px-12 pt-6 overflow-scroll">
      <div className="explore-detector relative h-full flex flex-col items-center justify-end gap-2 overflow-hidden">
        {plantingState ? (
          <PlantDetector
            detecting={isDetecting}
            onPlantDetection={verifyPlant}
            plantDetails={plant}
            error={error}
          />
        ) : (
          <CreatureGeneration
            creature={creature}
            error={error}
            generating={isSeeding}
            onReset={reset}
          />
        )}
      </div>
    </section>
  );
};

export default Explore;
