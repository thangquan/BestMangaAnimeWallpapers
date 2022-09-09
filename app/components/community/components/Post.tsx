import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoUserPost from './InfoUserPost'
import ImagePost from './ImagePost'
import Constant from '../../../controller/Constant'
import ReactPost from './ReactPost'
import TitlePost from './TitlePost'

type Props = {}

const Post = (props: Props) => {
    return (
        <View style={styles.post}>
            <InfoUserPost />
            <ImagePost imageUrl='https://images6.alphacoders.com/740/thumb-1920-740310.jpg' />
            <ReactPost />
            <TitlePost title='hello world' />
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
