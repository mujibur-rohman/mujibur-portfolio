export interface Paginate<T> {
  page: number;
  limit: number;
  totalRows: number;
  totalPage: number;
  data: T[];
}
