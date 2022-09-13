import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export default class StorageManager {
    static setData = async (key: string, value: any) => {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (error: any) {
            Alert.alert(error)
        }
    }

    static getData = async (key: any) => {
        try {
            let data: any = await AsyncStorage.getItem(key)
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }
}
