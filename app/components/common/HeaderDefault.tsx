import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Constant from '../../controller/Constant'

type Props = {
    title: string
}
const HeaderDefault = ({ title }: Props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Icon name='arrow-back-outline' size={24} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Icon name='arrow-back-outline' size={24} color='transparent' />
        </View>
    )
}

export default HeaderDefault

const styles = StyleSheet.create({
    header: {
        zIndex: 9999,
        height: 46,
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
