import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import HeaderCreatePost from './HeaderCreatePost'
import InfoUser from './InfoUser'
type Props = {}

const CreatePost = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <HeaderCreatePost />
                <InfoUser />
            </View>
        </SafeAreaView>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
