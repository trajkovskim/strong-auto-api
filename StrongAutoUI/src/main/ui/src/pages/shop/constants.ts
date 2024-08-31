export enum SortBy {
  UNSORTED = 'UNSORTED',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
}

export const sortByToValue: Record<SortBy, string> = {
  [SortBy.UNSORTED]: '',
  [SortBy.PRICE_ASC]: 'totalAmount=asc',
  [SortBy.PRICE_DESC]: 'totalAmount=desc',
  [SortBy.ID_ASC]: 'id=asc',
  [SortBy.ID_DESC]: 'id=desc',
};

export const pageSizes = [10, 20, 40, 60, 100];
