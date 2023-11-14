type Transaction = {
  id: number,
  account_name: string,
  coverage_lines: string,
  uw_name: string,
  premium: string,
  state: string,
  effective_date: string,
  expiration_date: string,
  sic: string,
  status: string
}

type IFilterData = {
  statuses: Array<String>,
  coverage_lines: Array<String>,
  deal_stages: Array<String>,
  uw_names: Array<String>,
  searchText: string
}
