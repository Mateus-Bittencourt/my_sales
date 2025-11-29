interface IPagination {
  currentPage: number
  perPage: number
  totalItems: number
  totalPages: number
}

export interface IResponse<T> {
  data: T
  pagination?: IPagination
}

export interface IPageOptions {
  page: number
  limit: number
}
