import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../../controller/Constant'
import HeaderCreatePost from './HeaderCreatePost'
import InfoUser from './InfoUser'
import ImageCreatePost from './ImageCreatePost'
import FooterCreatePost from './FooterCreatePost'
import ImagePicker from 'react-native-image-crop-picker'
import Util from '../../controller/Util'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import RNProgressHud from 'progress-hud'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const CreatePost = (props: Props) => {
    const navigation = useNavigation()
    const currentUser = useSelector((state: any) => state.userSlice.data)
    const [textContent, setTextContent] = useState<string>('')
    const [imageTmp, setImageTmp] = useState<any>()

    const handleOnRemoveImage = (): void => {
        setImageTmp(null)
    }

    const handlePicImage = async (): Promise<void> => {
        let checkPermissions = await Util.hasLibraryPermission()
        if (!checkPermissions) {
            return
        }
        ImagePicker.openPicker({
            mediaType: 'photo',
            forceJpg: true,
        }).then((image: any) => {
            setImageTmp(image)
        })
    }

    const handleOnClickBtnCreatePost = (): void => {
        if (!textContent.trim() && !imageTmp?.path) {
            Util.showAlert('Please enter content')
        } else if (!imageTmp?.path) {
            Util.showAlert('Please choice image')
        } else {
            handleOnCreatePost()
        }
    }

    const handleUploadImageToServer = async (): Promise<string> => {
        let ext: any = Util.getExtensionFile(imageTmp?.path)
        ext = '.' + ext[0]
        let fileName: string =
            'image_' + Math.floor(new Date().getTime() + new Date().getSeconds() / 2) + ext
        const reference = storage().ref(`post/${fileName}`)
        await reference.putFile(imageTmp?.path)
        let url = await storage().ref(`post/${fileName}`).getDownloadURL()
        return url
    }

    const handleOnCreatePost = async (): Promise<void> => {
        RNProgressHud.show()
        let urlImage = ''
        if (imageTmp?.path) {
            urlImage = await handleUploadImageToServer()
        }
        let idPost = 'post_' + new Date().getTime().toString()
        firestore()
            .collection(Constant.collection.posts)
            .doc(idPost)
            .set({
                id: idPost,
                data: {
                    title: textContent.trim(),
                    image: urlImage,
                    created: new Date().getTime(),
                },
                idUser: currentUser.id,
            })
            .then(() => {
                handleCreatePostSuccess()
            })
            .catch(() => {
                Util.showAlert('Create post failed')
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const handleCreatePostSuccess = (): void => {
        setImageTmp(null)
        setTextContent('')
        Util.showAlertSuccess('Create post successful')
        navigation.goBack()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <HeaderCreatePost handleOnCreatePost={handleOnClickBtnCreatePost} />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                    <InfoUser />
                    <TextInput
                        value={textContent}
                        onChangeText={setTextContent}
                        placeholder='How are you today?'
                        placeholderTextColor={'gray'}
                        multiline={true}
                        style={styles.textInput}
                    />
                    {!!imageTmp?.path && (
                        <ImageCreatePost
                            imageUrl={imageTmp?.path}
                            handleOnRemoveImage={handleOnRemoveImage}
                        />
                    )}
                </ScrollView>
                <FooterCreatePost handlePicImage={handlePicImage} />
            </View>
        </SafeAreaView>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        fontSize: 16,
        padding: 20,
        fontFamily: Constant.fonts.poppinsRegular,
        color: Constant.color.text,
    },
})
