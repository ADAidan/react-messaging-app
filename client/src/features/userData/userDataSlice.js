/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    profilePicture: null,
    status: null,
  },
  settings: {
    theme: 'light',
    notifications: true,
  },
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSettings: (state, action) => {
      state.settings = action.payload
    },
    logoutAction: (state) => {
      state.user = initialState.user
      state.settings = initialState
    },
  },
})

export const { setUser, setSettings, logoutAction } = userDataSlice.actions

export default userDataSlice.reducer