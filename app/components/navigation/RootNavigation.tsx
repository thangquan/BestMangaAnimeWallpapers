import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackActionType } from '@react-navigation/native'
import Home from '../home/Home'
import Constant from '../../controller/Constant'
import ImageDetail from '../imageDetail/ImageDetail'

type Props = {}

const Stack = createNativeStackNavigator()

const RootNavigation = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={Constant.screenName.Home} component={Home} />
            <Stack.Screen name={Constant.screenName.ImageDetail} component={ImageDetail} />
        </Stack.Navigator>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})
