import Filter from "bad-words";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeSince = (date: Date | string) => {
  const d = new Date();
  const getTimeNumber =
    typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const seconds = Math.floor((d.getTime() - getTimeNumber) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const validateUsername = (text: string) => {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/;
  return pattern.test(text);
};

export const cleanup = (text: string) => {
  const filter = new Filter();

  try {
    return filter.clean(text);
  } catch {
    return text;
  }
};

export const Color = () => {
  const colorArr = [
    "#FF5925",
    "#FF27A1",
    "#006F92",
    "#FF003D",
    "#FF6B00",
    "#4EA84C",
    "#BD97FF",
    "#F90",
    "#0076FF",
    "#17D5FF",
    "#0085FF",
    "#AC3EEF",
  ];
  return colorArr;
};
