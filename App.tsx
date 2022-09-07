import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from './app/controller/Constant'
import Home from './app/components/home/Home'
import RootNavigation from './app/components/navigation/RootNavigation'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import store from './app/redux/store'

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigation />
            <Toast />
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    }
})
