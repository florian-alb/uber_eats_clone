import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {useLocation} from "react-router-dom";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}