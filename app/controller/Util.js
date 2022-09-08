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
}
