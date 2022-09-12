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
        },
        updateStateModalLogin: (state, action) => {
            state.modalLogin = action.payload
        },
        updateStateModalRegister: (state, action) => {
            state.modalRegister = action.payload
        }
    }
})

const { reducer, actions } = userSlice
export const { updateCurrentUser, updateStateModalLogin, updateStateModalRegister } = actions
export default reducer
