import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import Constant from './../../../controller/Constant'
import { useDispatch, useSelector } from 'react-redux'
import UserModel from '../../../model/UserModel'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { updateStateModalLogin, updateStateModalRegister } from '../../../redux/userSlice'
import { useTranslation } from 'react-i18next'

type Props = {}

const InfoUser = ({}: Props) => {
    const dispatch = useDispatch()
    const { t: lang } = useTranslation()
    const { avatarUrl, name, email } = useSelector((state: any) => state.userSlice.data)
    const colors = useSelector((state: any) => state.themeSlice.colors)

    const handleOnClickBtnLogin = (): void => {
        dispatch(updateStateModalLogin(true))
    }

    const handleOnClickBtnRegister = (): void => {
        dispatch(updateStateModalRegister(true))
    }

    return (
        <View style={styles.info}>
            <Avatar
                size={100}
                rounded
                source={
                    avatarUrl
                        ? {
                              uri: avatarUrl
                          }
                        : Constant.icons.avatarDefault
                }
            />
            {email ? (
                <View style={styles.description}>
                    <Text style={{ ...styles.name, color: colors.text }}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            ) : (
                <View style={styles.auth}>
                    <TouchableOpacity
                        style={styles.btnAuth}
                        onPress={() => {
                            handleOnClickBtnLogin()
                        }}
                    >
                        <Text style={styles.textBtnAuth}>{lang('auth.login')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnAuth}
                        onPress={() => {
                            handleOnClickBtnRegister()
                        }}
                    >
                        <Text style={styles.textBtnAuth}>{lang('auth.register')}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default InfoUser

const styles = StyleSheet.create({
    info: {
        marginTop: 30,
        alignItems: 'center'
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    },
    email: {
        marginTop: 2,
        fontSize: 18,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.robotoSlabMedium
    },
    description: {
        alignItems: 'center'
    },
    auth: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnAuth: {
        width: wp(33),
        marginHorizontal: 20,
        backgroundColor: Constant.color.blue,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnAuth: {
        paddingHorizontal: 6,
        color: Constant.color.text,
        fontSize: 16,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
