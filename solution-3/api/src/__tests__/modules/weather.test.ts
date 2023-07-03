// import request from "supertest";

import { fetchCurrentWeather } from "../../modules/weather";

describe("Weather", () => {
  it("should return weather for a specified zipcode", async () => {
    const weather = await fetchCurrentWeather(92354);
    console.log(weather);
    expect(weather).toBeDefined();
  });

  it("should return weather for a specified longitude and latitude", async () => {
    const weather = await fetchCurrentWeather({ lat: 34.0522, lon: -118.2437 });
    console.log(weather);
    expect(weather).toBeDefined();
  });

  it("should return an error if zipcode is invalid", async () => {
    let error: any;

    try {
      await fetchCurrentWeather(123);
    } catch (err: any) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it("should return an error if longitude and latitude are invalid", async () => {
    let error: any;

    try {
      await fetchCurrentWeather({ lat: 100, lon: 190 });
    } catch (err: any) {
      error = err;
    }

    expect(error).toBeDefined();
  });
});
