import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from '../../../controller/Constant'

type Props = {
    title: string
}

const TitlePost = ({ title }: Props) => {
    return (
        <View style={styles.title}>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    )
}

export default TitlePost

const styles = StyleSheet.create({
    title: {
        marginTop: 4,
        marginBottom: 4
    },
    textTitle: {
        fontSize: 16,
        color: Constant.color.text
    }
})
