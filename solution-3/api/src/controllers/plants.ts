import { format } from "url";
import fetch from "node-fetch";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { bucket } from "../modules/gcp";
import { detectPlantHealth } from "../modules/plant";

export const uploadImage = (file: any) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

export default async function plantController(fastify: FastifyInstance) {
  fastify.post("/verify", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as {
      plantDId: string;
      spaceDId: string;
      image: string;
      longitude?: number;
      latitude?: number;
    };

    try {
      // GET PLANT INPUTS
      const health = await detectPlantHealth(body.image);

      // HIT CREDENTIAL MICROSERVICE
      // Generate intial claim for plant
      // Check metadata of image
      // Associate claim with DiD which may be 3 types
      // Key local based, Device, and Blockchain
      // Return claim/proof to client

      const claim = fetch(process.env.ISSUER_SERVICE_URL ?? "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantDId: body.plantDId,
          spaceDId: body.spaceDId,
          longitude: body.longitude,
          latitude: body.latitude,
          scientificName: health?.suggestions[0].plant_name,
          canClaimCredit: true,
        }),
      });

      reply.send({ health, claim });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  });
}
