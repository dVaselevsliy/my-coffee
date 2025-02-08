
import { SORT_FIELD } from "../pages/ProductPage";
import { Coffee } from "../types/Coffee";

export const getPreperedName = (
  productArray: Coffee[],
  query: string,
  sortField
) => {
  let preperedArray = [...productArray]

  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery) {
    preperedArray = preperedArray.filter(product => (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    ))
  }

  if (sortField) {
    preperedArray = preperedArray.filter(element => {
      switch (sortField) {
        case SORT_FIELD.Africa:
          return element.region === 'Africa';
        
        case SORT_FIELD.AsiaPacific:
          return element.region === 'Asia Pacific';
        
        case SORT_FIELD.CentralAmerica:
          return element.region === 'Central America';
        
        case SORT_FIELD.MiddleEast:
          return element.region === 'Middle East';
        
        case SORT_FIELD.SouthAmerica:
          return element.region === 'South America';
        
        case SORT_FIELD.All:
          return true;
        
        default:
          return true
      }
    })
  }
    
  return preperedArray;
}