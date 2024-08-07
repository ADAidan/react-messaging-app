/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const onlineCounterSlice = createSlice({
  name: 'onlineCounter',
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
    setOnlineAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setOnlineAmount } = onlineCounterSlice.actions

export default onlineCounterSlice.reducer