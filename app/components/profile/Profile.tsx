import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constant from './../../controller/Constant'
import InfoUser from './components/InfoUser'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import HeaderMain from '../common/HeaderMain'
import auth from '@react-native-firebase/auth'
import StorageManager from '../../controller/StorageManager'
import { logoutUser } from '../../redux/userSlice'
import Util from '../../controller/Util'
import { useNavigation, StackActions } from '@react-navigation/native'

const listItem = [
    {
        id: 1,
        type: 'update',
        title: 'Update profile',
        icon: 'ios-settings',
        screenName: 'Settings'
    },
    {
        id: 2,
        type: 'terms',
        title: 'Terms & Conditions',
        icon: 'document-text-outline',
        screenName: 'Settings'
    },
    {
        id: 3,
        type: 'help',
        title: 'Help and support',
        icon: 'ios-help-circle-outline'
    },
    {
        id: 4,
        type: 'logout',
        title: 'Logout',
        icon: 'log-out-outline'
    }
]

type Props = {}

const Profile = (props: Props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const currentUser = useSelector((state: any) => state.userSlice.data)

    const handleOnClickItem = (item: any): void => {
        switch (item.type) {
            case 'update':
                handleOnUpdateInfoUser()
                break
            case 'terms':
                navigation.dispatch(StackActions.push(Constant.screenName.TermsPage))
                break
            case 'help':
                handleOnHelp()
                break
            case 'logout':
                handleOnLogout()
            default:
                break
        }
    }

    const handleOnUpdateInfoUser = (): void => {}

    const handleOnHelp = (): void => {
        Linking.openURL(`mailto:${Constant.mailAdmin}`)
    }

    const handleOnLogout = (): void => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        Util.showAlertSuccess('Logout successful!')
        dispatch(logoutUser(null))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <HeaderMain title='Profile' />
            <InfoUser />
            <View style={styles.body}>
                {listItem.map((item, index) => {
                    if (item.type == 'update' || item.type == 'logout') {
                        if (!currentUser.id) {
                            return null
                        }
                    }
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.item}
                            key={item.title}
                            onPress={() => {
                                handleOnClickItem(item)
                            }}
                        >
                            <Icon name={item.icon} size={24} color={Constant.color.text} />
                            <Text style={styles.textItem}>{item.title}</Text>
                            <Icon
                                name='caret-forward-circle-outline'
                                size={26}
                                color={Constant.color.text}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    body: {
        marginTop: 40,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderColor: Constant.color.grayText,
        borderTopWidth: 1
    },
    item: {
        height: 50,
        backgroundColor: Constant.color.grayText,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textItem: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
