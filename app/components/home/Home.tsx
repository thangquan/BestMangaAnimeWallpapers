import { FlatList, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderNormal from '../common/HeaderNormal'
import CommonAPIs from '../../controller/APIs/CommonAPIs'
import CardImage from '../common/CardImage'
import ListCategory from './ListCategory'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Constant from './../../controller/Constant'
import Loading from './../common/Loading'
import LoadingFooter from '../common/LoadingFooter'

type Props = {}

const Home = (props: Props) => {
    const [data, setData] = useState<any[]>([])
    const [listCategory, setListCategory] = useState<any[]>(Constant.categories)
    const [categoryFocus, setCategoryFocus] = useState<string>(Constant.categories[0])
    const [loading, setLoading] = useState<boolean>(false)

    const onEndReached = (): void => {
        CommonAPIs.getImageByCategory(categoryFocus)
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
            .catch((err) => {
                console.log('err', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getImageByCategory(categoryFocus)
    }, [categoryFocus])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderNormal />
            <ListCategory
                data={listCategory}
                categoryFocus={categoryFocus}
                setCategoryFocus={setCategoryFocus}
            />
            {loading ? (
                <Loading />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => <CardImage uri={item} width={(wp(100) - 45) / 2} />}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReached={onEndReached}
                    ListFooterComponent={() => <LoadingFooter />}
                />
            )}
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
        padding: 20,
        paddingVertical: 0
    },
    imageItem: {
        marginRight: 20,
        marginTop: 20,
        width: (Constant.screen.width - 60) / 2,
        borderRadius: 5
    }
})
