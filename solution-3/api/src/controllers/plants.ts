import fetch from "node-fetch";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { detectPlantHealth } from "../modules/plant";

export default async function plantController(fastify: FastifyInstance) {
  fastify.post("/verify", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as {
      userDid: string;
      plantDId: string;
      spaceDId: string;
      image: string;
      longitude?: number;
      latitude?: number;
    };

    try {
      if (!body.userDid || !body.image || !body.plantDId || !body.spaceDId) {
        throw new Error("Missing required fields");
      }

      // GET PLANT INPUTS
      const health = await detectPlantHealth(body.image);

      // HIT CREDENTIAL MICROSERVICE

      const claimRes = await fetch(`${process.env.ISSUER_SERVICE_URL ?? ""}/v1/${body.userDid}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentialSchema:
            "https://raw.githubusercontent.com/wefa-tech/idThon/Oba-One_idThon/schemas/proof-of-plant-care.json",
          type: "ProofOfPlantCare",
          credentialSubject: {
            plantDId: body.plantDId,
            spaceDId: body.spaceDId,
            longitude: body.longitude,
            latitude: body.latitude,
            scientificName: health?.suggestions[0].plant_name,
            canClaimCredit: true,
          },
          expiration: 1903357766,
        }),
      });

      const claim = await claimRes.json();

      reply.send({ health, claim });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  });
}
