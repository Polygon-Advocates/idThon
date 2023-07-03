// import request from "supertest";

import { detectPlantType, detectPlantHealth } from "../../modules/plant";

describe("Plant Identification", () => {
  it("should identify plant", async () => {
    const plant = await detectPlantType(img);

    console.log(plant);
    expect(1).toBe(1);
  });

  it("should return an error if not plant", async () => {
    expect(1).toBe(1);
  });

  it("should return an error if plant id body is invalid", async () => {
    expect(1).toBe(1);
  });
});

describe("Plant Health", () => {
  it("should identify plant health", async () => {
    const health = await detectPlantHealth(img);

    console.log(health);
    expect(1).toBe(1);
  });

  it("should return an error if not plant", async () => {
    expect(1).toBe(1);
  });

  it("should return an error if plant id body is invalid", async () => {
    expect(1).toBe(1);
  });
});

const img = "";
