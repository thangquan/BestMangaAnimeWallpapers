import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoUserPost from './InfoUserPost'
import ImagePost from './ImagePost'
import Constant from '../../../controller/Constant'
import ReactPost from './ReactPost'
import TitlePost from './TitlePost'
import PostModel from '../../../model/PostModel'

type Props = {
    dataPost: PostModel
}

const Post = ({ dataPost }: Props) => {
    const { image, title } = dataPost

    return (
        <View style={styles.post}>
            <InfoUserPost data={dataPost} />
            <ImagePost imageUrl={image} />
            <ReactPost />
            <TitlePost title={title} />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    post: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Constant.color.postBackgroundColor,
        borderRadius: 20,
        paddingVertical: 16
    }
})
