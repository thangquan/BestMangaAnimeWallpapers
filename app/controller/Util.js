import { Alert, Linking, PermissionsAndroid } from 'react-native'
import { Platform } from 'react-native'
import Constant from './Constant'
import Toast from 'react-native-toast-message'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'

export default class Util {
    static isAndroid = () => {
        return Platform.OS === 'android'
    }

    static isIOS = () => {
        return Platform.OS === 'ios'
    }

    static showAlertSuccess = (title) => {
        Toast.show({
            text1: 'Notification',
            text2: title,
            visibilityTime: 1000
        })
    }

    static hasLibraryPermission = async () => {
        if (this.isIOS()) {
            const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
            switch (result) {
                case RESULTS.GRANTED:
                    return true
                default:
                    const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
                    if (status === 'granted') return true
                    Alert.alert('Notification', 'Please grant library permission', [
                        {
                            text: 'No'
                        },
                        {
                            text: 'YES',
                            onPress: () => Linking.openSettings()
                        }
                    ])
                    return false
            }
        }
        //Android
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        const hasPermission = await PermissionsAndroid.check(permission)
        if (hasPermission) {
            return true
        }
        const status = await PermissionsAndroid.request(permission)
        if (status === 'granted') return true
        Alert.alert('Notification', 'Please grant library permission', [
            {
                text: 'No'
            },
            {
                text: 'YES',
                onPress: () => Linking.openSettings()
            }
        ])
        return false
    }

    static getExtensionFile = (filename) => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
    }

    static showAlert = (title) => {
        Alert.alert('Notification', title)
    }

    static showAlertErrorLogin = (error) => {
        console.log('error.code', error.code)
        if (error.code === 'auth/email-already-in-use') {
            this.showAlert('That email address is already in use!')
        } else if (error.code === 'auth/invalid-email') {
            this.showAlert('That email address is invalid!')
        } else if (error.code === 'auth/wrong-password') {
            this.showAlert('That password is wrong!')
        } else if (error.code === 'auth/user-not-found') {
            this.showAlert('User not found!')
        } else {
            this.showAlert('Login failed! Please try again later')
        }
    }

    static validEmail = (email = '') => {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return pattern.test(email)
    }

    static calculateElapsedTime = (timeCreated) => {
        const created = timeCreated
        let periods = {
            year: 365 * 30 * 24 * 60 * 60 * 1000,
            month: 30 * 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            day: 24 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000
        }
        let diff = Date.now() - created

        for (const key in periods) {
            if (diff >= periods[key]) {
                let result = Math.floor(diff / periods[key])
                if (result == 1) {
                    return `${result} ${key} ago`
                } else {
                    return `${result} ${key}s ago`
                }
            }
        }
        return 'Just now'
    }
}
