import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from './app/controller/Constant'
import Home from './app/components/home/Home'

const App = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Home />
            </SafeAreaView>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    }
})
