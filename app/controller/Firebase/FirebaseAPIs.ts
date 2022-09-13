import Constant from '../Constant'
import firestore from '@react-native-firebase/firestore'
import UserModel from '../../model/UserModel'

export default class FirebaseAPIs {
    static async getInfoUser(id: string) {
        try {
            let user: any = await firestore().collection(Constant.collection.users).doc(id).get()
            return Promise.resolve(new UserModel(user._data))
        } catch (error) {
            return this.handleFail(error)
        }
    }
    static handleFail(data: any) {
        return Promise.reject(data)
    }
}
