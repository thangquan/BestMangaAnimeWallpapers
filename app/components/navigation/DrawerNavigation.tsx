import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Constant from '../../controller/Constant'
import DrawerContent from '../drawerContent/DrawerContent'
import TabBarNavigation from './TabBarNavigation'
import Home from '../home/Home'
// import TabBarNavigation from './TabBarNavigation'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName={Constant.screenName.TabBarNavigation}
            drawerContent={(props) => <DrawerContent />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
            }}
        >
            <Drawer.Screen name={Constant.screenName.Home} component={Home} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})
