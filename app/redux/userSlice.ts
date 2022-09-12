import { createSlice, current } from '@reduxjs/toolkit'
import UserModel from '../model/UserModel'
import Constant from './../controller/Constant'

const userSlice = createSlice({
    name: 'categorySlice',
    initialState: {
        data: new UserModel(null),
        modalLogin: false,
        modalRegister: false
    },
    reducers: {
        updateCurrentUser: (state, action) => {
            state.data = action.payload
        }
    }
})

const { reducer, actions } = userSlice
export const { updateCurrentUser } = actions
export default reducer
