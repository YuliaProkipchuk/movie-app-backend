import "dotenv/config";
const version = process.env.VERSION || "v1";
export const BASE_PREFIX = `/api/${version}`;
