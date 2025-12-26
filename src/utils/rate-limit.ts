import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(8, "5 m"), // 8 attempts per 5 mins
  analytics: false,
  prefix: "howswork:pin-validate",
});
