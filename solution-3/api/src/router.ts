import { FastifyInstance } from "fastify";

import plantsController from "./controllers/plants";

export async function router(fastify: FastifyInstance) {
  fastify.register(plantsController, { prefix: "/plants" });
}
