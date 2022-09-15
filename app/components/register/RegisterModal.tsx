import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Constant from '../../controller/Constant'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements'
import ButtonNormal from '../createPost/ButtonNormal'
import { useDispatch, useSelector } from 'react-redux'
import { updateStateModalLogin, updateStateModalRegister } from '../../redux/userSlice'
import { register } from '../../redux/thunks/authThunk'
import auth from '@react-native-firebase/auth'
import Util from '../../controller/Util'
import firestore from '@react-native-firebase/firestore'
import RNProgressHud from 'progress-hud'
import { useTranslation } from 'react-i18next'

type Props = {}

const RegisterModal = ({}: Props) => {
    const dispatch = useDispatch()
    const isVisible = useSelector((state: any) => state.userSlice?.modalRegister)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const { t: lang } = useTranslation()

    const hideModal = (): void => {
        dispatch(updateStateModalRegister(false))
    }

    const handleOnClickBtnRegister = (): void => {
        if (!name.trim()) {
            Util.showAlert('Name registration is required')
        } else if (!Util.validEmail(email.trim())) {
            Util.showAlert('Email is not valid')
        } else if (password.trim().length < 6) {
            Util.showAlert('Password is too short')
        } else {
            handleOnRegister()
        }
    }

    const handleOnRegister = (): void => {
        RNProgressHud.show()
        auth()
            .createUserWithEmailAndPassword(email.trim(), password.trim())
            .then((res) => {
                handleRegisterSuccess()
            })
            .catch((error) => {
                Util.showAlertErrorLogin(error)
            })
    }

    const handleRegisterSuccess = (): void => {
        firestore()
            .collection('Users')
            .doc(auth()?.currentUser?.uid)
            .set({
                id: auth()?.currentUser?.uid,
                email: auth()?.currentUser?.email,
                name: name.trim()
            })
            .then(() => {
                Util.showAlertSuccess('Register successful')
                dispatch(updateStateModalRegister(false))
                dispatch(updateStateModalLogin(true))
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    if (!isVisible) {
        return null
    }

    return (
        <Modal isVisible={isVisible} onBackdropPress={hideModal}>
            <View style={styles.container}>
                <Text style={styles.title}>Register to Waifu Pictures {'\n'} 😍😍😘😘😍😍😘😘</Text>
                <View style={styles.formInput}>
                    <Input
                        label={lang('profile.name')}
                        labelStyle={styles.labelStyle}
                        autoCompleteType='email'
                        placeholder={lang('profile.name')}
                        keyboardType='default'
                        leftIcon={<Icon name='person-outline' size={22} color='gray' />}
                        containerStyle={{
                            paddingHorizontal: 0
                        }}
                        renderErrorMessage={false}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={setName}
                    />
                    <Input
                        label={'Email'}
                        labelStyle={styles.labelStyle}
                        autoCompleteType='email'
                        placeholder='Email'
                        keyboardType='email-address'
                        leftIcon={<Icon name='mail-outline' size={22} color='gray' />}
                        containerStyle={{
                            marginTop: 10,
                            paddingHorizontal: 0
                        }}
                        renderErrorMessage={false}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={setEmail}
                    />
                    <Input
                        label={lang('auth.password')}
                        autoCompleteType='Password'
                        labelStyle={styles.labelStyle}
                        placeholder={lang('auth.password')}
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
                        title={lang('auth.register')}
                        onPress={handleOnClickBtnRegister}
                        containerStyle={{
                            marginTop: 20
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            hideModal()
                            dispatch(updateStateModalLogin(true))
                        }}
                    >
                        <Text style={styles.register}>{lang('auth.login')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default RegisterModal

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
