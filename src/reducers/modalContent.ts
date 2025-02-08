import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  modalActive: false,
  signIn: false,
  modalBuyActive: false,
  buySuccessfully: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.modalActive = action.payload
    },
    setSignIn: (state, action: PayloadAction<boolean>) => {
      state.signIn = action.payload
    },
    setModalBuyActive: (state, action: PayloadAction<boolean>) => {
      state.modalBuyActive = action.payload
    },
    setBuySuccessfully: (state, action: PayloadAction<boolean>) => {
      state.buySuccessfully = action.payload
    }
  }
})

export default modalSlice.reducer
export const { actions } = modalSlice