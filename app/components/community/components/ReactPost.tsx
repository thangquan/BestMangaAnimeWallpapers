import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../../controller/Constant'
import PostModel from '../../../model/PostModel'
import { useDispatch, useSelector } from 'react-redux'
import { updateStateModalLogin } from '../../../redux/userSlice'
import firestore from '@react-native-firebase/firestore'

type Props = {
    dataPost: PostModel
}

const ReactPost = ({ dataPost }: Props) => {
    const dispatch = useDispatch()
    const { like, comment, id } = dataPost
    const currentUser = useSelector((state: any) => state.userSlice?.data)
    const ref = firestore().collection(Constant.collection.posts).doc(id)

    const handleOnClickLovePost = (): void => {
        if (!currentUser.id) {
            dispatch(updateStateModalLogin(true))
            return
        }
        handleOnLovePost()
    }

    const checkIsLoved = (): boolean => {
        if (!currentUser.id) {
            return false
        }
        return like.indexOf(currentUser.id) > -1
    }

    const handleOnLovePost = (): void => {
        let like = checkIsLoved()
            ? firestore.FieldValue.arrayRemove(currentUser.id)
            : firestore.FieldValue.arrayUnion(currentUser.id)
        ref.set(
            {
                like
            },
            { merge: true }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.listReact}>
                <TouchableOpacity style={styles.btnReact} onPress={handleOnClickLovePost}>
                    <Icon
                        name={checkIsLoved() ? 'heart' : 'heart-outline'}
                        size={30}
                        color={checkIsLoved() ? Constant.color.heart : Constant.color.text}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnReact}>
                    <Icon name='chatbubbles-outline' size={26} color={Constant.color.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.countReact}>
                {like.length ? (
                    <Text style={styles.textCountLover}>
                        {like.length} like{like.length > 1 && 's'}
                    </Text>
                ) : null}
                {comment.length ? (
                    <Text style={styles.textCountLover}>
                        {comment.length} comment{comment.length > 1 && 's'}
                    </Text>
                ) : null}
            </View>
        </View>
    )
}

export default ReactPost

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    },
    listReact: {
        flexDirection: 'row'
    },
    btnReact: {
        padding: 5
    },
    countReact: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCountLover: {
        fontSize: 13,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.poppinsRegular,
        includeFontPadding: false
    },
    driverReact: {
        paddingHorizontal: 3,
        color: Constant.color.grayText,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
