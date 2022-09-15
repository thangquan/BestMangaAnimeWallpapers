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
import { useTranslation } from 'react-i18next'
import HeaderMain from '../common/HeaderMain'

type Props = {}

const Community = (props: Props) => {
    const [dataPost, setDataPost] = useState<Array<PostModel>>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const { t: lang } = useTranslation()

    const getListPost = async (): Promise<any> => {
        const sub = firestore()
            .collection(Constant.collection.posts)
            .orderBy('data.created', 'desc')
            .onSnapshot(async (querySnapshot) => {
                let listPost = await Promise.all(
                    querySnapshot.docs.map(async (i: any) => {
                        let user = await FirebaseAPIs.getInfoUser(i._data.idUser)
                        return new PostModel({ ...i._data, user })
                    })
                )
                setDataPost(listPost)
            })
        return sub
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
                <HeaderMain title={lang('common.community')} />
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
