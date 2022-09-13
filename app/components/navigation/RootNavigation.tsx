import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
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
import CreatePost from '../createPost/CreatePost'
import StorageManager from '../../controller/StorageManager'
import { useDispatch } from 'react-redux'
import { updateCurrentUser } from '../../redux/userSlice'

type Props = {}

export type RootStackParamList = {
    DrawerNavigation: undefined
    ImageDetail: { imageUrl: ''; showFooter?: boolean }
    Privacy: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>

const Stack = createNativeStackNavigator()

const RootNavigation = (props: Props) => {
    const dispatch = useDispatch()

    const loading = async (): Promise<void> => {
        let currentUser = await StorageManager.getData(Constant.keys.currentUser)
        if (currentUser && currentUser?.id) {
            dispatch(updateCurrentUser(currentUser))
        }
    }

    useEffect(() => {
        loading()
    }, [])
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
                <Stack.Screen name={Constant.screenName.CreatePost} component={CreatePost} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})
