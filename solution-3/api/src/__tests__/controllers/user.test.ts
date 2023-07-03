/* eslint-disable jest/no-disabled-tests */
import request from "supertest";
// import prisma from "@prisma/client";

import server from "../../index";

// export function post(url, body) {
//   const httpRequest = request(app).post(url);
//   httpRequest.send(body);
//   httpRequest.set("Accept", "application/json");
//   httpRequest.set("Origin", "http://localhost:3000");
//   return httpRequest;
// }

describe("User Registration", () => {
  it.skip("should return registration options", async () => {
    const res = await request(server).get("/api/v1/user/register-options");

    expect(res.status).toBe(200);
  });

  it.skip("should register a user", async () => {
    const res = await request(server).post("/api/v1/user/register").send({});

    expect(res.status).toBe(200);
  });

  it.skip("should return an error if username is already registered", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if username is not provided", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if register body not passed", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if register body is invalid", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if register user already exists", async () => {
    expect(1).toBe(1);
  });
});

describe("User Login", () => {
  it.skip("should return login options", async () => {
    const res = await request(server).get("/user/login-options");

    expect(res.status).toBe(200);
  });

  it.skip("should login a user", async () => {
    const res = await request(server).post("/user/login").send({});

    expect(res.status).toBe(200);
  });

  it.skip("should return an error if login body not passed", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if login body is invalid", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if login user does not exist", async () => {
    expect(1).toBe(1);
  });
});

describe("User Logout", () => {
  it.skip("should logout a user", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if user is not logged in", async () => {
    expect(1).toBe(1);
  });
});

describe("User Connect Wallet", () => {
  it.skip("should connect a user wallet", async () => {
    expect(1).toBe(1);
  });

  it.skip("should generate a nonce", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if nonce not passed", async () => {
    expect(1).toBe(1);
  });

  it.skip("should return an error if not valid signature", async () => {
    expect(1).toBe(1);
  });
});
