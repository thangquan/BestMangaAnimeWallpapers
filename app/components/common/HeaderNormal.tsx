import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

type Props = {}

const HeaderNormal = (props: Props) => {
    const navigation = useNavigation()
    const colors = useSelector((state: any) => state.themeSlice.colors)

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Text style={{ ...styles.txtHeader, color: colors.text }}>Waifu Pictures</Text>
            </Pressable>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Icon name='options' size={24} color={colors.text} />
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
