import firestore from '@react-native-firebase/firestore'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constant from '../../../controller/Constant'
import Util from '../../../controller/Util'
import PostModel from '../../../model/PostModel'
import ActionSheetPost, { refActionPostSheet } from './ActionSheetPost'
import ImagePost from './ImagePost'
import InfoUserPost from './InfoUserPost'
import ReactPost from './ReactPost'
import TitlePost from './TitlePost'

type Props = {
    dataPost: PostModel
}

const Post = ({ dataPost }: Props) => {
    const { image, title } = dataPost

    const handleOnDeletePost = (): void => {
        let query = firestore().doc(`${Constant.collection.posts}/${dataPost.id}`)
        query.delete().then(deletePostSuccess).catch(deletePostFail)
    }

    const deletePostSuccess = (): void => {
        Util.showAlertSuccess('Delete post successful')
        refActionPostSheet.current?.close()
    }

    const deletePostFail = (): void => {
        Util.showAlertError('Delete post Failed')
        refActionPostSheet.current?.close()
    }
    return (
        <View style={styles.post}>
            <InfoUserPost data={dataPost} />
            <ImagePost imageUrl={image} />
            <ReactPost dataPost={dataPost} />
            <TitlePost title={title} />
            <ActionSheetPost dataPost={dataPost} handleOnDeletePost={handleOnDeletePost} />
        </View>
    )
}

export default React.memo(Post)

const styles = StyleSheet.create({
    post: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Constant.color.postBackgroundColor,
        borderRadius: 20,
        paddingVertical: 16,
    },
})
