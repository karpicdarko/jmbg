import { configureStore } from '@reduxjs/toolkit'
import validReducer from '../features/validSlice'
import messageReducer from '../features/messageSlice'
import personReducer from '../features/personSlice'

export default configureStore({
  reducer: {
    valid: validReducer,
    message: messageReducer,
    person: personReducer,
  },
})