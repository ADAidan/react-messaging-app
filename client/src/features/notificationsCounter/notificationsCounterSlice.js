/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const notificationsCounterSlice = createSlice({
  name: 'notificationsCounter',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setNotificationsAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setNotificationsAmount } = notificationsCounterSlice.actions

export default notificationsCounterSlice.reducer