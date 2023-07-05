import { createContext, useContext, useEffect, useState } from "react";

import { createPlant, readPlants } from "../../modules/idb";

interface PlantsProps {
  plants: Plant[];
  handleFetchPlants: () => Promise<void>;
  handleCreatePlant: (plant: Plant) => Promise<void>;
}

const PlantsContext = createContext<PlantsProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PlantsProvider = ({ children }: Props) => {
  const currentValue = useContext(PlantsContext);

  if (currentValue) throw new Error("PlantsProvider can only be used once");

  const [plants, setPlants] = useState<Plant[]>([]);

  async function handleFetchPlants() {
    const newPlants = await readPlants();

    setPlants(newPlants);
  }

  async function handleCreatePlant(plant: Plant) {
    await createPlant(plant);

    const newPlants = [...plants, plant];

    setPlants(newPlants);
  }

  useEffect(() => {
    handleFetchPlants();
  }, []);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        handleCreatePlant,
        handleFetchPlants,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const value = useContext(PlantsContext);
  if (!value) throw new Error("Must be used within a PlantsProvider");
  return value;
};
