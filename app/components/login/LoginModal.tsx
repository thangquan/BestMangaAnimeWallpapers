import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Constant from '../../controller/Constant'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements'
import ButtonNormal from '../createPost/ButtonNormal'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateCurrentUser,
    updateStateModalLogin,
    updateStateModalRegister
} from '../../redux/userSlice'
import { loginWithEmailAndPassword } from '../../redux/thunks/authThunk'
import auth from '@react-native-firebase/auth'
import Util from '../../controller/Util'
import UserModel from '../../model/UserModel'
import RNProgressHud from 'progress-hud'

type Props = {}

const LoginModal = ({}: Props) => {
    const dispatch = useDispatch()
    const isVisible = useSelector((state: any) => state.userSlice.modalLogin)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState<string>('cu@cai.nho')
    const [password, setPassword] = useState<string>('123456')

    const hideModal = (): void => {
        dispatch(updateStateModalLogin(false))
    }

    const handleOnLogin = (): void => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                dispatch(updateCurrentUser(new UserModel(res.user)))
                dispatch(updateStateModalLogin(false))
                Util.showAlertSuccess('Login successful')
            })
            .catch((error) => {
                Util.showAlertErrorLogin(error)
            })
    }

    return (
        <Modal isVisible={isVisible} onBackdropPress={hideModal}>
            <View style={styles.container}>
                <Text style={styles.title}>Wellcome to Waifu Pictures {'\n'} 😍😍😘😘😍😍😘😘</Text>
                <View style={styles.formInput}>
                    <Input
                        label={'Email'}
                        labelStyle={styles.labelStyle}
                        autoCompleteType='email'
                        placeholder='Email'
                        keyboardType='email-address'
                        leftIcon={<Icon name='mail-outline' size={22} color='gray' />}
                        containerStyle={{
                            paddingHorizontal: 0
                        }}
                        value={email}
                        renderErrorMessage={false}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={setEmail}
                    />
                    <Input
                        value={password}
                        label={'Password'}
                        autoCompleteType='Password'
                        labelStyle={styles.labelStyle}
                        placeholder='Password'
                        secureTextEntry={secureTextEntry}
                        renderErrorMessage={false}
                        leftIcon={<Icon name='lock-closed' size={22} color='gray' />}
                        rightIcon={
                            <TouchableOpacity
                                onPress={() => {
                                    setSecureTextEntry(!secureTextEntry)
                                }}
                            >
                                <Icon
                                    name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                    size={22}
                                    color='gray'
                                />
                            </TouchableOpacity>
                        }
                        containerStyle={{
                            marginTop: 16,
                            paddingHorizontal: 0
                        }}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={setPassword}
                    />
                </View>
                <View>
                    <ButtonNormal
                        title='Login'
                        onPress={handleOnLogin}
                        containerStyle={{
                            marginTop: 20
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            hideModal()
                            dispatch(updateStateModalRegister(true))
                        }}
                    >
                        <Text style={styles.register}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default LoginModal

const styles = StyleSheet.create({
    container: {
        minHeight: Constant.screen.width,
        backgroundColor: Constant.color.postBackgroundColor,
        borderRadius: 8,
        padding: 20,
        paddingVertical: 30,
        justifyContent: 'space-between'
    },
    formInput: {
        marginTop: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: Constant.color.text,
        fontFamily: Constant.fonts.poppinsSemiBold
    },
    inputContainerStyle: {
        marginTop: 6,
        backgroundColor: '#2c2c2f',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    inputStyle: {
        fontSize: 16,
        paddingVertical: 0,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabRegular
    },
    labelStyle: {},
    register: {
        fontSize: 13,
        textDecorationLine: 'underline',
        marginTop: 8,
        color: Constant.color.grayText,
        textAlign: 'center',
        fontFamily: Constant.fonts.robotoSlabRegular
    }
})
