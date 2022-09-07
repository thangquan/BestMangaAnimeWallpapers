import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
const rootReducer = {
    categorySlice
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store
