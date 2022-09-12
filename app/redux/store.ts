import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import userSlice from './userSlice'

const rootReducer = {
    categorySlice,
    userSlice
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store
