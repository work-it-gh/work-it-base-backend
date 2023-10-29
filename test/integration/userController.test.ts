import request from "supertest";
import { createExpressApp } from "../../src/app";

const app = createExpressApp();

const BASE_API_PATH = "/api/v1";

import { connect, close, clear } from "../database";

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await close();
});

describe("User Controller", () => {
  describe("Create a User", () => {
    it("should return 200 and the acessToken", async () => {
      const response = await request(app)
        .post(`${BASE_API_PATH}/auth/register`)
        .set("content-type", "application/json")
        .send({
          email: "logos.agbeko@gmail.com",
          password: "12345678",
        });

      expect(response.status).toBe(200);
    });
  });
});
