export type SortFieldType = {
  All: string;
  CentralAmerica: string;
  Africa: string;
  SouthAmerica: string;
  AsiaPacific: string;
  MiddleEast: string;
}

export const SORT_FIELD: SortFieldType = {
  All: 'all',
  CentralAmerica: 'Central America',
  Africa: 'Africa',
  SouthAmerica: 'South America',
  AsiaPacific: 'Asia Pacific',
  MiddleEast: 'Middle East'
} 

export const sortArray = [
  {
    name: 'All',
    searchParamsName: 'All',
    id: SORT_FIELD.All
  },
  {
    name: 'Central America',
    searchParamsName: 'CentralAmerica',
    id: SORT_FIELD.CentralAmerica
  },
  {
    name: 'Africa',
    searchParamsName: 'Africa',
    id: SORT_FIELD.Africa
  },
  {
    name: 'South America',
    searchParamsName: 'SouthAmerica',
    id: SORT_FIELD.SouthAmerica
  },
  {
    name: 'Asia Pacific',
    searchParamsName: 'AsiaPacific',
    id: SORT_FIELD.AsiaPacific
  },
  {
    name: 'Middle East',
    searchParamsName: 'MiddleEast',
    id: SORT_FIELD.MiddleEast
  },
]