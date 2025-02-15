import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { getCoffee } from "../api"
import { Coffee } from "../types/Coffee"
import { SORT_FIELD } from "../helper/sortField"

export const init = createAsyncThunk('coffee/fetch', 
  () => {
    return getCoffee()
  }
)

interface CoffeeType {
  coffee: Coffee[],
  loading: boolean,
  error: string,
  priceSort: boolean,
  alphabeticallySort: boolean,
  roastLevelSort: boolean,
  selectedProductId: number | null,
  selectedProduct: Coffee | null,
  sort: number,
  sortField: string
}

const initialState: CoffeeType = {
  coffee: [],
  loading: false,
  error: '',
  priceSort: false,
  alphabeticallySort: false,
  roastLevelSort: false,
  selectedProductId: null,
  selectedProduct: null,
  sort: 0,
  sortField: SORT_FIELD.All
}

export const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    setPriceSort: (state, action: PayloadAction<boolean>) => {
      state.priceSort = action.payload
    },

    setAlphabeticallySort: (state, action: PayloadAction<boolean>) => {
      state.alphabeticallySort = action.payload
    },

    setRoastLevelSort: (state, action: PayloadAction<boolean>) => {
      state.roastLevelSort = action.payload
    },

    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },

    setSort: (state, action) => {
      state.sort = action.payload
    },

    setSortField: (state, action) => {
      state.sortField = action.payload 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true
    })

    builder.addCase(init.fulfilled, (state, action) => {
      state.coffee = action.payload
      state.loading = false
    })

    builder.addCase(init.rejected, (state) => {
      state.loading = false
      state.error = 'loading error'
    })
  }
})

export default coffeeSlice.reducer
export const { actions } = coffeeSlice