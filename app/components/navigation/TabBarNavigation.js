import { Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '../home/Home'
import Constant from '../../controller/Constant'
import Community from '../community/Community'
import Icon from 'react-native-vector-icons/Ionicons'
import Profile from '../profile/Profile'

const Tab = createMaterialBottomTabNavigator()

const TabBarNavigation = () => {
    return (
        <Tab.Navigator
            labeled={false}
            barStyle={{
                backgroundColor: Constant.color.backgroundColor,
                borderTopWidth: 0.5,
                borderColor: Constant.color.gray
            }}
            initialRouteName={Constant.screenName.Community}
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    let focusedColor = focused ? Constant.color.blue : '#fff'
                    if (route.name === Constant.screenName.Home) {
                        iconName = 'home'
                    } else if (route.name === Constant.screenName.Community) {
                        iconName = 'planet'
                    } else if (route.name === Constant.screenName.Profile) {
                        iconName = 'person'
                    }
                    return <Icon name={iconName} size={22} color={focusedColor} />
                },
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0
                }
            })}
        >
            <Tab.Screen name={Constant.screenName.Home} component={Home} />
            <Tab.Screen name={Constant.screenName.Community} component={Community} />
            <Tab.Screen name={Constant.screenName.Profile} component={Profile} />
        </Tab.Navigator>
    )
}

export default TabBarNavigation

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '500'
    }
})
