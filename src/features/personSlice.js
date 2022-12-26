import { createSlice } from '@reduxjs/toolkit'

export const personSlice = createSlice({
  name: 'person',
  initialState: {
    name: "",
    surname: "",
    birthDate: "",
    region: "",
    gender: ""
  },
  reducers: {
    setName: (state, action) => {
        state.name = action.payload
    },
    setSurname: (state, action) => {
        state.surname = action.payload
    },
    setBirthDate: (state, action) => {
        state.birthDate = action.payload
    },
    setRegion: (state, action) => {
        state.region = action.payload
    },
    setGender: (state, action) => {
        state.gender = action.payload
    },
  },
})

export const { setName, setSurname, setBirthDate, setRegion, setGender } = personSlice.actions

export default personSlice.reducer