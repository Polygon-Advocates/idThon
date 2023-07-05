import { createContext, useContext, useEffect, useState } from "react";

import {
  createPlant,
  createCreature,
  readPlants,
  readCreatures,
} from "../../modules/idb";

interface WefadexProps {
  energy: number;
  plants: Plant[];
  creatures: Creature[];
  handleFetchPlants: () => Promise<void>;
  handleFetchCreatures: () => Promise<void>;
  handleFetchEnergy: () => void;
  handleEnergyGrowth: (amount: number) => void;
  handleCreatePlant: (plant: Plant) => Promise<void>;
  handleCreateCreature: (creature: Creature) => Promise<void>;
}

const WefaContext = createContext<WefadexProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const WefaProvider = ({ children }: Props) => {
  const currentValue = useContext(WefaContext);

  if (currentValue) throw new Error("WefaProvider can only be used once");

  const [energy, setEnergy] = useState<number>(
    Number(localStorage.getItem("energy"))
  );
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);

  async function handleFetchPlants() {
    const newPlants = await readPlants();

    setPlants(newPlants);
  }

  async function handleFetchCreatures() {
    const newCreatures = await readCreatures();

    setCreatures(newCreatures);
  }

  const handleFetchEnergy = () => {
    const energy = Number(localStorage.getItem("energy"));

    setEnergy(energy);
  };

  async function handleEnergyGrowth(amount: number) {
    const newEnergy = energy + amount;

    setEnergy(newEnergy);

    localStorage.setItem("energy", newEnergy.toString());
  }

  async function handleCreatePlant(plant: Plant) {
    await createPlant(plant);

    const newPlants = [...plants, plant];

    setPlants(newPlants);
  }

  async function handleCreateCreature(creature: Creature) {
    await createCreature(creature);

    const newCreatures = [...creatures, creature];

    setCreatures(newCreatures);
  }

  useEffect(() => {
    handleFetchPlants();
    handleFetchCreatures();
  }, []);

  return (
    <WefaContext.Provider
      value={{
        energy,
        plants,
        creatures,
        handleCreatePlant,
        handleCreateCreature,
        handleFetchPlants,
        handleFetchCreatures,
        handleFetchEnergy,
        handleEnergyGrowth,
      }}
    >
      {children}
    </WefaContext.Provider>
  );
};

export const useWefa = () => {
  const value = useContext(WefaContext);
  if (!value) throw new Error("Must be used within a WefaProvider");
  return value;
};
