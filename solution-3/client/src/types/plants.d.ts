declare interface PlantDetails {
  id: number;
  common_names: string[];
  scientific_name: string;
  structured_name?: {
    genus: string;
    species: string;
  };
  taxonomy?: {
    kingdom: string;
    order: string;
    family: string;
    genus: string;
    class: string;
  };
  watering?: {
    min: number;
    max: number;
  };
  edible_parts?: string[];
  wiki_image?: {
    value: string;
    citation: string;
    license_name: string;
    license_url: string;
  };
  wiki_description?: {
    value: string;
    citation: string;
    license_name: string;
    license_url: string;
  };
}

declare interface PlantHealth {
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
    plant_details: PlantDetails;
    probability: number;
    confirmed: boolean;
    common_names;
  }[];
  modifiers: string[];
  secret: string;
  fail_cause: null | string;
  countable: boolean;
  feedback: null | string;
  is_plant_probability: number;
  is_plant: boolean;
}

declare interface PlantCredit {
  plantDid: string;
  spaceDid: string;
  health: number; // 0-100
  plantDate: number;
  canClaimCredit: boolean;
  creditClaimed?: boolean;
  longitude?: number;
  latitude?: number;
}

declare interface Plant extends PlantDetails, PlantCredit, Identity, Asset {}
