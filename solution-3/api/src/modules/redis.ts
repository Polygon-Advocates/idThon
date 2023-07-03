import { createClient } from "redis";

export const redis = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST ?? "localhost"}:${
    process.env.REDIS_PORT ?? 6379
  }`,
});
