import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  /* config options here */
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(config);
