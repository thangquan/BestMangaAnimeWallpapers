import dynamicLinks from '@react-native-firebase/dynamic-links'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import CommonAPIs from '../../controller/APIs/CommonAPIs'
import CardImage from '../common/CardImage'
import HeaderNormal from '../common/HeaderNormal'
import LoadingFooter from '../common/LoadingFooter'
import Constant from './../../controller/Constant'
import Loading from './../common/Loading'
import ListCategory from './ListCategory'

type Props = {}

const Home = (props: Props) => {
    const [data, setData] = useState<any[]>([])
    const [listCategory, setListCategory] = useState<any[]>(Constant.categories)
    const [loading, setLoading] = useState<boolean>(false)
    const currentCategoryFocus = useSelector((state: any) => state.categorySlice?.currentFocused)

    const onEndReached = (): void => {
        CommonAPIs.getImageByCategory(currentCategoryFocus)
            .then((res) => {
                setData((prev) => [...prev, ...res])
            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    const getImageByCategory = (categoryFocus: string): void => {
        setLoading(true)
        CommonAPIs.getImageByCategory(categoryFocus)
            .then((res) => {
                setData(res)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink((link: any) => {
            console.log('link11', link?.url)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then((link: any) => {
                console.log('link2: ', link?.url)
            })
    }, [])

    useEffect(() => {
        getImageByCategory(currentCategoryFocus)
    }, [currentCategoryFocus])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <HeaderNormal />
                <ListCategory data={listCategory} />
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <CardImage uri={item} width={(wp(100) - 45) / 2} />
                        )}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        onEndReached={onEndReached}
                        ListFooterComponent={() => <LoadingFooter />}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    imageItem: {
        marginRight: 20,
        marginTop: 20,
        width: (Constant.screen.width - 60) / 2,
        borderRadius: 5,
    },
})
