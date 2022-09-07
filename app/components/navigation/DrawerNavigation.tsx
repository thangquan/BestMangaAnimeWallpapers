import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Constant from '../../controller/Constant'
import DrawerContent from '../drawerContent/DrawerContent'
import Home from './../home/Home'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName={Constant.screenName.Home}
            drawerContent={(props) => <DrawerContent />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front'
            }}
        >
            <Drawer.Screen name={Constant.screenName.Home} component={Home} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})
