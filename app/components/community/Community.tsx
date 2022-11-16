import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    SafeAreaView,
    RefreshControl,
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
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Community = (props: Props) => {
    const [dataPost, setDataPost] = useState<Array<PostModel>>([])
    const navigation = useNavigation<any>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const { t: lang } = useTranslation()
    const [lastDocument, setLastDocument] = useState<any>()
    const refDataPost = useRef<FlatList>(null)
    const lastTap = useRef<number>(0)

    const getListPost = async (): Promise<any> => {
        let query = firestore()
            .collection(Constant.collection.posts)
            .orderBy('data.created', 'desc')
        query
            .limit(5)
            .get()
            .then(async (querySnapshot: any) => {
                setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
                let listPost = await Promise.all(
                    querySnapshot.docs.map(async (i: any) => {
                        let user = await FirebaseAPIs.getInfoUser(i._data.idUser)
                        return new PostModel({ ...i._data, user })
                    })
                )
                setDataPost(listPost)
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    }

    const onRefresh = (): void => {
        setIsRefreshing(true)
        getListPost()
    }

    const renderItem = ({ item }: { item: PostModel }) => <Post dataPost={item} />

    const onEndReached = (): void => {
        let query = firestore()
            .collection(Constant.collection.posts)
            .orderBy('data.created', 'desc')
        if (lastDocument !== undefined) {
            query = query.startAfter(lastDocument)
        }
        query
            .limit(5)
            .get()
            .then(async (querySnapshot: any) => {
                if (querySnapshot.docs.length) {
                    setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
                    let listPost = await Promise.all(
                        querySnapshot.docs.map(async (i: any) => {
                            let user = await FirebaseAPIs.getInfoUser(i._data.idUser)
                            return new PostModel({ ...i._data, user })
                        })
                    )
                    setDataPost((prev) => prev?.concat(listPost))
                }
            })
    }

    useEffect(() => {
        getListPost()
    }, [])

    useEffect(() => {
        navigation.addListener('tabPress', () => {
            const now = Date.now()
            const DELAY = 300
            if (now - lastTap.current < DELAY) {
                if (refDataPost.current) {
                    refDataPost.current.scrollToIndex({
                        index: 0,
                        animated: true,
                    })
                    onRefresh()
                }
            } else {
                lastTap.current = now
            }
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.community}>
                <HeaderMain title={lang('common.community')} />
                <FlatList
                    ref={refDataPost}
                    data={dataPost}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            tintColor={Constant.color.text}
                        />
                    }
                    onEndReached={onEndReached}
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
        backgroundColor: Constant.color.backgroundColor,
    },
})
