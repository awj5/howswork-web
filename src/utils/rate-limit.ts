import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export default new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"), // 5 attempts per 5 mins
  analytics: false,
  prefix: "howswork:ratelimit",
});
