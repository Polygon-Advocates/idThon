interface PlantHealth {
  id: number;
  custom_id: null | string;
  meta_data: {
    latitude: null | number;
    longitude: null | number;
    date: string;
    datetime: string;
  };
  uploaded_datetime: number;
  finished_datetime: number;
  images: {
    file_name: string;
    url: string;
  }[];
  suggestions: {
    id: number;
    plant_name: string;
    plant_details: {
      language: string;
      scientific_name: string;
      structured_name: {
        genus: string;
        species: string;
      };
    };
    probability: number;
    confirmed: boolean;
  }[];
  modifiers: string[];
  secret: string;
  fail_cause: null | string;
  countable: boolean;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}

const PLANT_API_URL = "https://plant.id/api/v2";

export async function detectPlantHealth(img: string) {
  try {
    const predictionRes = await fetch(`${PLANT_API_URL}/health_assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.PLANT_API_KEY ?? "",
      },
      body: JSON.stringify({
        images: [img],
      }),
    });

    const predictions: PlantHealth = await predictionRes.json();

    return predictions;
  } catch (error) {
    console.error("Error detecting objects in image", error);
  }
}
