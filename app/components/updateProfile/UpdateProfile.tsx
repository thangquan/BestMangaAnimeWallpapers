import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'
import React, { useState } from 'react'
import Constant from '../../controller/Constant'
import HeaderDefault from '../common/HeaderDefault'
import { useDispatch, useSelector } from 'react-redux'
import UserModel from '../../model/UserModel'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import ButtonNormal from '../createPost/ButtonNormal'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import Util from '../../controller/Util'
import RNProgressHud from 'progress-hud'
import { useNavigation } from '@react-navigation/native'
import { updateCurrentUser } from '../../redux/userSlice'

type Props = {}

type UserUpdate = {
    name: string
    avatarUrl?: string
}
const UpdateProfile = (props: Props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const currentUser: UserModel = useSelector((state: any) => state.userSlice.data)
    const [avatar, setAvatar] = useState(currentUser.avatarUrl)
    const [name, setName] = useState<string>(currentUser.name)
    const [isChangeAvatar, setIsChangeAvatar] = useState<boolean>(false)

    const handlePicImage = async (): Promise<void> => {
        let checkPermissions = await Util.hasLibraryPermission()
        if (!checkPermissions) {
            return
        }
        ImagePicker.openPicker({
            mediaType: 'photo',
            forceJpg: true,
            cropping: true
        }).then((image: any) => {
            setAvatar(image.path)
            setIsChangeAvatar(true)
        })
    }

    const handleUploadImageToServer = async (): Promise<string> => {
        let ext: any = Util.getExtensionFile(avatar)
        ext = '.' + ext[0]
        let fileName: string =
            'avatar_' + Math.floor(new Date().getTime() + new Date().getSeconds() / 2) + ext
        const reference = storage().ref(`avatar/${fileName}`)
        await reference.putFile(avatar)
        let url = await storage().ref(`avatar/${fileName}`).getDownloadURL()
        return url
    }

    const handleOnUpdateInfoUser = async (): Promise<void> => {
        RNProgressHud.show()
        let dataUpdate: UserUpdate = {
            name
        }
        if (isChangeAvatar) {
            dataUpdate.avatarUrl = await handleUploadImageToServer()
        }
        firestore()
            .collection(Constant.collection.users)
            .doc(currentUser.id)
            .update(dataUpdate)
            .then(() => {
                Util.showAlertSuccess('Update successfully!')
                dispatch(
                    updateCurrentUser({
                        ...currentUser,
                        ...dataUpdate
                    })
                )
                navigation.goBack()
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <HeaderDefault title='Update Profile' />
            <View style={styles.body}>
                <TouchableOpacity onPress={handlePicImage}>
                    <ImageBackground
                        source={
                            avatar
                                ? {
                                      uri: avatar
                                  }
                                : Constant.icons.avatarDefault
                        }
                        style={styles.avatar}
                    >
                        <Icon name='camera-outline' size={40} color={'#fff'} />
                    </ImageBackground>
                </TouchableOpacity>
                <Input
                    label={'Name'}
                    labelStyle={styles.labelStyle}
                    autoCompleteType='email'
                    placeholder='Name'
                    value={name}
                    keyboardType='default'
                    containerStyle={{
                        marginTop: 20,
                        paddingHorizontal: 0
                    }}
                    renderErrorMessage={false}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    onChangeText={setName}
                />
                <ButtonNormal
                    title='Save'
                    containerStyle={{
                        marginTop: 20
                    }}
                    onPress={() => handleOnUpdateInfoUser()}
                />
            </View>
        </SafeAreaView>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    avatar: {
        alignSelf: 'center',
        width: wp(30),
        height: wp(30),
        overflow: 'hidden',
        borderRadius: wp(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        marginTop: 10,
        paddingHorizontal: 30
    },
    inputContainerStyle: {
        marginTop: 6,
        backgroundColor: '#2c2c2f',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    labelStyle: {
        marginBottom: 10,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    },
    inputStyle: {
        fontSize: 16,
        paddingVertical: 0,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabRegular
    }
})
