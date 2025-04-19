"use client";

import { Suspense } from "react";
import SocialAuthHandler from "./SocialAuthHandler";

export default function SocialAuthPage() {
  return (
    <Suspense>
      <SocialAuthHandler />
    </Suspense>
  );
}
