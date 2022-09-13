import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    SafeAreaView,
    RefreshControl
} from 'react-native'
import React, { createRef, useEffect, useRef, useState } from 'react'
import Constant from '../../controller/Constant'
import HeaderCommunity from './components/HeaderCommunity'
import Post from './components/Post'
import ButtonCreatePost from '../common/ButtonCreatePost'
import LoginModal from '../login/LoginModal'
import RegisterModal from '../register/RegisterModal'
import firestore from '@react-native-firebase/firestore'
import PostModel from '../../model/PostModel'
import FirebaseAPIs from '../../controller/Firebase/FirebaseAPIs'

type Props = {}

const Community = (props: Props) => {
    const [dataPost, setDataPost] = useState<Array<PostModel>>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const getListPost = async (): Promise<any> => {
        let data: any = await firestore()
            .collection(Constant.collection.posts)
            .orderBy('data.created', 'desc')
            .get()
        let listPost = await Promise.all(
            data._docs.map(async (i: any) => {
                let user = await FirebaseAPIs.getInfoUser(i._data.idUser)
                return new PostModel({ ...i._data, user })
            })
        )
        setDataPost(listPost)
    }

    useEffect(() => {
        getListPost()
    }, [])

    const onRefresh = (): number => {
        setIsRefreshing(true)
        let time = setTimeout(() => {
            setIsRefreshing(false)
        }, 700)
        getListPost()
        return time
    }

    const renderItem = ({ item }: { item: PostModel }) => <Post dataPost={item} />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.community}>
                <HeaderCommunity />
                <FlatList
                    data={dataPost}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingBottom: 20
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            tintColor={Constant.color.text}
                        />
                    }
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
