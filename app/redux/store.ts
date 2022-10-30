import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import userSlice from './userSlice'
import themeSlice from './themeSlice'

const rootReducer = {
    categorySlice,
    userSlice,
    themeSlice
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store
