import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackActionType } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../home/Home'
import Constant from '../../controller/Constant'
import ImageDetail from '../imageDetail/ImageDetail'
import { RouteProp } from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'

type Props = {}

export type RootStackParamList = {
    DrawerNavigation: undefined
    ImageDetail: { imageUrl: '' }
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>

const Stack = createNativeStackNavigator()

const RootNavigation = (props: Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name={Constant.screenName.DrawerNavigation}
                    component={DrawerNavigation}
                />
                <Stack.Screen name={Constant.screenName.ImageDetail} component={ImageDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})
