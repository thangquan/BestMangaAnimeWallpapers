import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from '../../../controller/Constant'

type Props = {}

const HeaderCommunity = (props: Props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Community</Text>
        </View>
    )
}

export default HeaderCommunity

const styles = StyleSheet.create({
    header: {},
    title: {
        fontSize: 24,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})
