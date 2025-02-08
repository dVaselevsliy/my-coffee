export const getSortCoffee = (
  productArray,
  sort,
  priceSort = false,
  alphabeticallySort = false,
  roastLevelSort = false,
) => {
  const newArray = [...productArray]
    
      if (priceSort) {
        if (sort === 1) {
          return newArray.sort((sort1, sort2) => (
            sort1.price - sort2.price
          ))
        } else if (sort === 2) {
          return newArray.sort((sort1, sort2) => (
            sort2.price - sort1.price
          ))
        }
      }
  
      if (alphabeticallySort) {
        if (sort === 1) {
          return newArray.sort((sort1, sort2) => (
            sort1.name.localeCompare(sort2.name)
          ))
        } else if (sort === 2) {
          return newArray.sort((sort1, sort2) => (
            sort2.name.localeCompare(sort1.name)
          ))
        }
      }
  
      if (roastLevelSort) {
        if (sort === 1) {
          return newArray.sort((sort1, sort2) => (
            sort1.roast_level - sort2.roast_level
          ))
        } else if (sort === 2) {
          return newArray.sort((sort1, sort2) => (
            sort2.roast_level - sort1.roast_level
          ))
        }
      }
  
      return newArray
}