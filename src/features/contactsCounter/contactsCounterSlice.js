/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const contactsCounterSlice = createSlice({
  name: 'contactsCounter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
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