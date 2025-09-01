"use client";

import { useEffect } from "react";
import { flushTrips } from "@/lib/offlineTripQueue";

export default function OfflineTripSync() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    flushTrips();
    window.addEventListener("online", flushTrips);
    return () => window.removeEventListener("online", flushTrips);
  }, []);

  return null;
}
