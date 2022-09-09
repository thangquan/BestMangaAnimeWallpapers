import { FlatList, StyleSheet, Text, View, Animated, Easing } from 'react-native'
import React, { createRef, useEffect, useRef } from 'react'
import Constant from '../../controller/Constant'
import HeaderCommunity from './components/HeaderCommunity'
import Post from './components/Post'

type Props = {}

// export const animationLoveRef = createRef<Lottie>()

const Community = (props: Props) => {
    const renderItem = (item: any) => <Post />

    return (
        <View style={styles.community}>
            <HeaderCommunity />
            <FlatList
                data={[1, 2, 23]}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
            />
        </View>
    )
}

export default Community

const styles = StyleSheet.create({
    community: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    }
})
