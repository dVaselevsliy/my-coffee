import { Dispatch } from "redux";

interface ActionsCoffee {
  setSort: (value: number) => { type: string; payload: number} 
  setAlphabeticallySort: (value: boolean) => { type: string; payload: boolean} 
  setRoastLevelSort: (value: boolean) => { type: string; payload: boolean} 
  setPriceSort: (value: boolean) => { type: string; payload: boolean} 
}

export const getActiveSort = (
  activeSort: string,
  dispatch: Dispatch,
  actionsCoffee: ActionsCoffee
) => {
  if (activeSort === 'all') {
        dispatch(actionsCoffee.setSort(0))
        dispatch(actionsCoffee.setAlphabeticallySort(false));
        dispatch(actionsCoffee.setRoastLevelSort(false));
        dispatch(actionsCoffee.setPriceSort(false))
      }
  
      if (activeSort === 'price-low-high') {
        dispatch(actionsCoffee.setSort(1))
        dispatch(actionsCoffee.setAlphabeticallySort(false));
        dispatch(actionsCoffee.setRoastLevelSort(false));
        dispatch(actionsCoffee.setPriceSort(true))
      }
  
      if (activeSort === 'price-high-low') {
        dispatch(actionsCoffee.setSort(2))
        dispatch(actionsCoffee.setAlphabeticallySort(false));
        dispatch(actionsCoffee.setRoastLevelSort(false));
        dispatch(actionsCoffee.setPriceSort(true))
      }
  
      if (activeSort === 'alphabetically-asc') {
        dispatch(actionsCoffee.setSort(1))
        dispatch(actionsCoffee.setAlphabeticallySort(true));
        dispatch(actionsCoffee.setRoastLevelSort(false));
        dispatch(actionsCoffee.setPriceSort(false))
      }
  
      if (activeSort === 'alphabetically-desc') {
        dispatch(actionsCoffee.setSort(2))
        dispatch(actionsCoffee.setAlphabeticallySort(true));
        dispatch(actionsCoffee.setRoastLevelSort(false));
        dispatch(actionsCoffee.setPriceSort(false))
      }
      
      if (activeSort === 'roast-level-low-high') {
        dispatch(actionsCoffee.setSort(1))
        dispatch(actionsCoffee.setAlphabeticallySort(false));
        dispatch(actionsCoffee.setRoastLevelSort(true));
        dispatch(actionsCoffee.setPriceSort(false))
      }
      
      if (activeSort === 'roast-level-high-low') {
        dispatch(actionsCoffee.setSort(2))
        dispatch(actionsCoffee.setAlphabeticallySort(false));
        dispatch(actionsCoffee.setRoastLevelSort(true));
        dispatch(actionsCoffee.setPriceSort(false))
      } 
}