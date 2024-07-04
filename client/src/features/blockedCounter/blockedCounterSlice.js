/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const blockedCounterSlice = createSlice({
  name: 'blockedCounter',
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
    setBlockedAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setBlockedAmount } = blockedCounterSlice.actions

export default blockedCounterSlice.reducer