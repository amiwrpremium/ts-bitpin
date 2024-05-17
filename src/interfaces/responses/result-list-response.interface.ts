export interface ResultListResponse<T> {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: T[];
}
