import Cloud from "@google-cloud/storage";
import path from "path";
const serviceKey = path.join(__dirname, "./keys.json");

const { Storage } = Cloud;

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "wefa-app",
});

export const bucket = storage.bucket("verified-plants");
