// Good practice for me, making TODO type for any, for future refactorings.

import type { UseQueryOptions } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export type QueryProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => Promise<any>,
  Sel = Awaited<ReturnType<F>>,
> = Omit<
  UseQueryOptions<Awaited<ReturnType<F>>, Error, Sel, readonly unknown[]>,
  "queryKey" | "queryFn" | "select"
>;

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Response<T> = {
  data: T;
  pagination: Pagination;
};
