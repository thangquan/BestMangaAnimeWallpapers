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
import Privacy from '../privacy/Privacy'
import TermsPage from '../termsPage/TermsPage'
import Community from '../community/Community'
import TabBarNavigation from './TabBarNavigation'

type Props = {}

export type RootStackParamList = {
    DrawerNavigation: undefined
    ImageDetail: { imageUrl: '' }
    Privacy: undefined
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
                initialRouteName={Constant.screenName.DrawerNavigation}
            >
                <Stack.Screen
                    name={Constant.screenName.DrawerNavigation}
                    component={DrawerNavigation}
                />
                <Stack.Screen name={Constant.screenName.ImageDetail} component={ImageDetail} />
                <Stack.Screen name={Constant.screenName.Privacy} component={Privacy} />
                <Stack.Screen name={Constant.screenName.TermsPage} component={TermsPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})
