import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const isEqual = (firstValue: unknown, secondValue: unknown): boolean => {
  // ! Attention This is simple way to compare objects use deep equal instead or better use libraries like lodash or ramda.
  // ! For now it's ok :)
  return JSON.stringify(firstValue) === JSON.stringify(secondValue);
};
