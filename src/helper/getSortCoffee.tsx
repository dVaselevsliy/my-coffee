import { Coffee } from "../types/Coffee"

export const getSortCoffee = (
  productArray: Coffee[],
  activeSort: string
) => {
  const newArray = [...productArray]

  switch (activeSort) {
    case 'all':
      return newArray
    
    case 'price-low-high':
      return newArray.sort((sort1, sort2) => (
        sort1.price - sort2.price
      ))
    
    case 'price-high-low':
      return newArray.sort((sort1, sort2) => (
        sort2.price - sort1.price
      ))
    
    case 'alphabetically-asc':
      return newArray.sort((sort1, sort2) => (
        sort1.name.localeCompare(sort2.name)
      ))
    
    case 'alphabetically-desc':
      return newArray.sort((sort1, sort2) => (
        sort2.name.localeCompare(sort1.name)
      ))
    
    case 'roast-level-low-high':
      return newArray.sort((sort1, sort2) => (
        sort1.roast_level - sort2.roast_level
      ))
    
    case 'roast-level-high-low':
      return newArray.sort((sort1, sort2) => (
        sort2.roast_level - sort1.roast_level
      ))
    
    default:
      return newArray
  }
}