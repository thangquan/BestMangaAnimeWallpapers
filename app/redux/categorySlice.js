import { createSlice, current } from '@reduxjs/toolkit'
import Constant from './../controller/Constant'

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        currentFocused: Constant.categories[0],
        currentIndex: 0
    },
    reducers: {
        updateCurrentFocused: (state, action) => {
            const { data, index } = action.payload
            state.currentFocused = data
            state.currentIndex = index
        }
    }
})

const { reducer, actions } = categorySlice
export const { updateCurrentFocused } = actions
export default reducer
