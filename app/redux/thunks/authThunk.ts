import { createAsyncThunk } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import Util from '../../controller/Util'

const register = createAsyncThunk('user/register', async (data: any) => {
    try {
        auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                return auth().currentUser
            })
            .catch((error) => {
                Util.showAlertErrorLogin(error)
            })
    } catch (error) {
        Util.showAlert(error)
    }
})

const loginWithEmailAndPassword = createAsyncThunk('user/login', async (data: any) => {
    try {
        auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                return res.user
            })
            .catch((error) => {
                Util.showAlertErrorLogin(error)
                return false
            })
    } catch (error) {
        Util.showAlert(error)
    }
})

export { register, loginWithEmailAndPassword }
