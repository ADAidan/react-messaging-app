/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const contactsCounterSlice = createSlice({
  name: 'contactsCounter',
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
    setContactsAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setContactsAmount } = contactsCounterSlice.actions

export default contactsCounterSlice.reducer