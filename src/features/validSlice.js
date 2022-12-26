import { createSlice } from '@reduxjs/toolkit'

export const validSlice = createSlice({
  name: 'valid',
  initialState: {
    value: false,
  },
  reducers: {
    validate: (state) => {
      state.value = true
    },
    invalidate: (state) => {
      state.value = false
    }
  },
})

export const { validate, invalidate } = validSlice.actions

export default validSlice.reducer