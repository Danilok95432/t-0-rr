export type SortField = 'id' | 'date' | 'org' | 'contragent' | 'itemname' | 'case' | 'article' | 'summ' | null
export type SortDirection = 0 | 1 | null

export type SortState = {
  order_by: SortField
  order_dir: SortDirection
}