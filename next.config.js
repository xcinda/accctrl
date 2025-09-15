/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
      experimental: {
    serverActions: {
      allowedOrigins: ['soua1ap09.a1.sou-pha.justice.cz'],
    },
  },
};
 


export default config;
