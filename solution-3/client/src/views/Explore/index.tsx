import { ExploreDataProps } from "../../hooks/views/useExplore";

import { PlantDetector } from "../../components/Plants/PlantDetector";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({
  error,
  isDetecting,
  verifyHealth,
  plant,
}) => {
  return (
    <section className="explore-view flex-col px-6 sm:px-12 pt-6 overflow-scroll">
      <div className="explore-detector relative h-full flex flex-col items-center justify-end gap-2 overflow-hidden">
        <PlantDetector
          detecting={isDetecting}
          onPlantDetection={verifyHealth}
          plantDetails={plant}
          error={error}
        />
      </div>
    </section>
  );
};

export default Explore;
