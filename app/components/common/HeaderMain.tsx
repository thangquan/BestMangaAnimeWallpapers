import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import { useSelector } from 'react-redux'

type Props = {
    title: string
}

const HeaderMain = ({ title = '' }: Props) => {
    const colors = useSelector((state: any) => state.themeSlice.colors)

    return (
        <View style={styles.header}>
            <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
        </View>
    )
}

export default HeaderMain

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
