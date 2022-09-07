import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from './app/controller/Constant'
import Home from './app/components/home/Home'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './app/components/navigation/RootNavigation'

const App = () => {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    }
})
