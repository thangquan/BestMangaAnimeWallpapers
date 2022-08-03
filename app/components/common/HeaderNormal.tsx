import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from '../home/controller/Constant'

type Props = {}

const HeaderNormal = (props: Props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.txtHeader}>Best Wallpapers</Text>
        </View>
    )
}

export default HeaderNormal

const styles = StyleSheet.create({
    header: {
        height: 46,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    txtHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Constant.color.text
    }
})
