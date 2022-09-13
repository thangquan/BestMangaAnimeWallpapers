import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    handlePicImage: Function
}

const FooterCreatePost = ({ handlePicImage }: Props) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    handlePicImage()
                }}
            >
                <Icon name='image' size={24} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default FooterCreatePost

const styles = StyleSheet.create({
    footer: {
        backgroundColor: Constant.color.backgroundColor,
        borderTopWidth: 0.5,
        paddingVertical: 10,
        borderTopColor: Constant.color.grayText,
        paddingHorizontal: 20,
        alignItems: 'flex-start'
    },
    item: {
        paddingHorizontal: 4
    }
})
