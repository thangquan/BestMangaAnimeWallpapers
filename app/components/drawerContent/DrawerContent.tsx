import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from './../../controller/Constant'

type Props = {}

const DrawerContent = (props: Props) => {
    return (
        <View style={styles.drawerContent}>
            <Text style={styles.title}>Waifu Pictures</Text>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    title: {
        marginTop: 20,
        fontSize: 26,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        color: Constant.color.backgroundColor,
        textAlign: 'center'
    }
})
