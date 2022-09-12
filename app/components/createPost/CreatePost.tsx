import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../../controller/Constant'
import HeaderCreatePost from './HeaderCreatePost'
import InfoUser from './InfoUser'
import { useSelector } from 'react-redux'
type Props = {}

const CreatePost = (props: Props) => {
    const currentUser = useSelector((state: any) => state.userSlice.data)
    console.log(currentUser)
    const [textContent, setTextContent] = useState<string>('')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <HeaderCreatePost />
                <InfoUser />
                <TextInput
                    value={textContent}
                    onChangeText={setTextContent}
                    placeholder='How are you today?'
                    placeholderTextColor={'gray'}
                    multiline={true}
                    style={styles.textInput}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        fontSize: 16,
        padding: 20,
        fontFamily: Constant.fonts.poppinsRegular,
        color: Constant.color.text
    }
})
