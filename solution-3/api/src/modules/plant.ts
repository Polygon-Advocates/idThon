interface PlantResponse {
  id: number;
  custom_id?: null | string;
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
      language: "en";
      scientific_name: string;
      structured_name: {
        genus: string;
        species: string;
      };
    };
    probability: number;
    confirmed: boolean;
  }[];
  modifiers: any[];
  secret: string;
  fail_cause: null | string;
  countable: true | false;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}

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

export async function detectPlantType(img?: string | ArrayBuffer | Buffer) {
  try {
    if (!img) {
      throw new Error("No image provided!");
    }

    let predictions: PlantResponse;

    if (typeof img === "string") {
      const predictionReq = await fetch(`${PLANT_API_URL}/identify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.PLANT_API_KEY ?? "",
        },
        body: JSON.stringify({
          images: [img],
          // modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          plant_details: ["common_names", "edible_parts", "taxonomy", "watering", "wiki_image", "wiki_description"],
        }),
      });

      predictions = await predictionReq.json();
    } else {
      const imageBlob = new Blob([img], { type: "image/jpeg" });
      const formData = new FormData();

      formData.append("image", imageBlob);
      formData.append("data", '{"plant_details": ["common_names"]}');

      const predictionReq = await fetch(`${PLANT_API_URL}/identify`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Api-Key": process.env.PLANT_API_KEY ?? "",
        },
        body: formData,
      });

      predictions = await predictionReq.json();
    }

    if (!predictions.is_plant) {
      throw new Error("No plant detected in image :(");
    }

    return predictions;
  } catch (error: any) {
    console.error("Error detecting objects in image", error);

    throw error;
  }
}

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
