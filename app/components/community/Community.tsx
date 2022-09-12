import { FlatList, StyleSheet, Text, View, Animated, Easing, SafeAreaView } from 'react-native'
import React, { createRef, useEffect, useRef } from 'react'
import Constant from '../../controller/Constant'
import HeaderCommunity from './components/HeaderCommunity'
import Post from './components/Post'
import ButtonCreatePost from '../common/ButtonCreatePost'
import LoginModal from '../login/LoginModal'
import RegisterModal from '../register/RegisterModal'

type Props = {}

const Community = (props: Props) => {
    const renderItem = (item: any) => <Post />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.community}>
                <HeaderCommunity />
                <FlatList
                    data={[1, 2, 23]}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />
                <ButtonCreatePost />
            </View>
        </SafeAreaView>
    )
}

export default Community

const styles = StyleSheet.create({
    community: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    }
})
