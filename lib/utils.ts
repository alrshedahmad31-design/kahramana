import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOpenNow(opens: string, closes: string): boolean {
  const now = new Date();
  const [oh, om] = opens.split(":").map(Number);
  const [ch, cm] = closes.split(":").map(Number);

  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = oh * 60 + om;
  let closeMins = ch * 60 + cm;

  if (closeMins <= openMins) {
    // Overnight shift: close time is next day
    // Case 1: Currently after opening (e.g. 10pm) -> check against 24h+closes
    // Case 2: Currently early morning (e.g. 12:30am) -> check against closes
    if (nowMins >= openMins) {
      return true; // Still within the same start-day
    }
    if (nowMins < closeMins) {
      return true; // Early morning next day
    }
    return false;
  }

  // Normal same-day shift
  return nowMins >= openMins && nowMins < closeMins;
}
