import api from "./api";

const STORAGE_KEY = "offline-trips";

export interface OfflineTrip {
  vehicleId: string;
  kilometers: number;
  gallons: number;
}

export function queueTrip(trip: OfflineTrip) {
  if (typeof window === "undefined") return;
  const queue: OfflineTrip[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  queue.push(trip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

export async function flushTrips() {
  if (typeof window === "undefined") return;
  const queue: OfflineTrip[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  if (queue.length === 0) return;

  const remaining: OfflineTrip[] = [];
  for (const trip of queue) {
    try {
      await api.post("/trips", trip);
    } catch {
      remaining.push(trip);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}
