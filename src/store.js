import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'


let store = configureStore({
    reducer: {
        user: userSlice,

    }
})

export default store