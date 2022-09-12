import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
import { DrawerActions, useNavigation } from '@react-navigation/native'

type Props = {}

const HeaderNormal = (props: Props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Text style={styles.txtHeader}>Waifu Pictures</Text>
            </Pressable>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Icon name='options' size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderNormal

const styles = StyleSheet.create({
    header: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    txtHeader: {
        fontSize: 22,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        color: Constant.color.text
    }
})
