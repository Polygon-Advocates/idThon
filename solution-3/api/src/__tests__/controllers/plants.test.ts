/* eslint-disable jest/no-disabled-tests */
import request from "supertest";

import server from "../../index";
// import { test } from "tap";
// import formAutoContent from "form-auto-content";
// import fs from "fs";

// const myForm = formAutoContent({
//   fullName: "Amarachi Aso",
//   article: fs.createReadStream(`./sample_files/file.txt`),
//   coverImage: fs.createReadStream(`./sample_files/cover.jpg`),
// });

// test("submits form with multiple files in it", async (t) => {
//   const res = await app.inject({
//     method: "post",
//     url: "/upload",
//     ...myForm,
//   });
//   t.equal(res.statusCode, 200, "returns a status code of 200");
//   t.equal(res.body, "success", "returns success message");
//   t.end();
// });

// export function post(url, body) {
//   const httpRequest = request(app).post(url);
//   httpRequest.send(body);
//   httpRequest.set("Accept", "application/json");
//   httpRequest.set("Origin", "http://localhost:3000");
//   return httpRequest;
// }

describe("Plant Verification", () => {
  it.skip("should verify a plant and return a proof", async () => {
    const res = await request(server).post("/api/v1/plant/verify").send({});
    expect(res.status).toBe(200);
  });

  it.skip("should return an error if not member of space", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if plant verification body not passed", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if plant verification body is invalid", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if not plant in curated list", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if plant is not in the right hardiness zone", async () => {
    expect(1).toBe(1);
  });
});

describe("Plant Nurturing", () => {
  it.skip("should nurture a plant and return a proof", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if not member of space", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if not plant in curated list", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if plant nurturing body not passed", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if plant nurturing body is invalid", async () => {
    expect(1).toBe(1);
  });
});
