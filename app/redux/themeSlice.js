import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Constant from '../controller/Constant'
import StorageManager from '../controller/StorageManager'
import { darkTheme, lightTheme } from '../themes'

export const getTheme = createAsyncThunk('theme/getTheme', async () => {
    return await StorageManager.getData('themeMode')
})

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        isDarkMode: true,
        colors: darkTheme
    },
    reducers: {
        switchTheme: (state, action) => {
            state.isDarkMode = action.payload
            StorageManager.setData('themeMode', action.payload)
            state.colors = action.payload ? darkTheme : lightTheme
        }
    },
    extraReducers: {
        [getTheme.fulfilled]: (state, action) => {
            if (action.payload != null) {
                state.colors = action.payload ? darkTheme : lightTheme
                state.isDarkMode = action.payload
            }
        }
    }
})

const { reducer, actions } = themeSlice
export const { switchTheme } = actions
export default reducer
