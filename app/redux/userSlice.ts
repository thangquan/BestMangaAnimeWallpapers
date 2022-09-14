import { createSlice, current } from '@reduxjs/toolkit'
import UserModel from '../model/UserModel'
import Constant from './../controller/Constant'
import { loginWithEmailAndPassword, register } from './thunks/authThunk'
import RNProgressHud from 'progress-hud'
import StorageManager from '../controller/StorageManager'

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
        updateStateModalRegister: (state, action: any) => {
            state.modalRegister = action.payload
        },
        logoutUser: (state, action: any) => {
            state.data = new UserModel(null)
            StorageManager.setData(Constant.keys.currentUser, null)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {})
            .addCase(register.rejected, (state, action) => {})
            .addCase(register.fulfilled, (state, action) => {
                let user = new UserModel(action.payload)
                state.data = user
            })
            .addCase(loginWithEmailAndPassword.pending, (state, action) => {})
            .addCase(loginWithEmailAndPassword.rejected, (state, action) => {})
            .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
                let user = new UserModel(action.payload)
                state.data = user
                state.modalLogin = true
            })
    }
})

const { reducer, actions } = userSlice
export const { updateCurrentUser, updateStateModalLogin, updateStateModalRegister, logoutUser } =
    actions
export default reducer
