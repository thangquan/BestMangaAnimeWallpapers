import { StyleSheet, Text, View, TouchableOpacity, TextProps, ViewStyle } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'

type Props = {
    title: string
    backgroundColor?: string
    titleStyle?: TextProps
    onPress?: any
    containerStyle?: ViewStyle
}

const ButtonNormal = ({
    containerStyle,
    title,
    backgroundColor = Constant.color.blue,
    titleStyle,
    onPress
}: Props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.buttonNormal, backgroundColor, ...containerStyle }}
            onPress={onPress}
        >
            <Text style={{ ...styles.text, ...titleStyle }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonNormal

const styles = StyleSheet.create({
    buttonNormal: {
        height: 46,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.poppinsSemiBold
    }
})
