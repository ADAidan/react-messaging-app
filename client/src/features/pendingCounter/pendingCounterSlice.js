/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const pendingCounterSlice = createSlice({
  name: 'pendingCounter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setPendingAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setPendingAmount } = pendingCounterSlice.actions

export default pendingCounterSlice.reducer