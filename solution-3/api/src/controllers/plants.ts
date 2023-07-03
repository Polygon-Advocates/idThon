import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { detectPlantHealth } from "../modules/plant";

export default async function plantController(fastify: FastifyInstance) {
  fastify.post("/verify", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { plantId: number; image: string; zipcode: number };

    try {
      // CHECK PLANT ZONE
      // const zone = await fetchPlantZones(body.zipcode);
      // Check zone is right ont to add plant

      // Check QR codes if any in image
      // Check metadata of image

      // GET PLANT INPUTS
      const health = await detectPlantHealth(body.image);

      // Get plant inputs from image like color, shades, etc.

      // GET ENVIRONMENT INPUTS
      // const weather = await fetchCurrentWeather(body.zipcode);

      // HIT CREDENTIAL MICROSERVICE
      // Generate intial claim for plant
      // Associate claim with DiD which may be 3 types
      // Key local based, Device, and Blockchain
      // Return claim/proof to client

      // HIT CREATURE GENERATION MICROSERVICE
      // Feed inputs to createure generation service
      // Return 2D image and 3D model to client

      reply.send({ health });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  });
}
