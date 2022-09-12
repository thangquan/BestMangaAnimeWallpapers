import { FlatList, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { createRef, useEffect, useState } from 'react'
import HeaderNormal from '../common/HeaderNormal'
import CommonAPIs from '../../controller/APIs/CommonAPIs'
import CardImage from '../common/CardImage'
import ListCategory from './ListCategory'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Constant from './../../controller/Constant'
import Loading from './../common/Loading'
import LoadingFooter from '../common/LoadingFooter'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import LoginModal from '../login/LoginModal'
import RegisterModal from '../register/RegisterModal'

type Props = {}

const Home = (props: Props) => {
    const [data, setData] = useState<any[]>([])
    const [listCategory, setListCategory] = useState<any[]>(Constant.categories)
    const [loading, setLoading] = useState<boolean>(false)
    const currentCategoryFocus = useSelector((state: any) => state.categorySlice?.currentFocused)
    const [isVisibleLogin, setIsVisibleLogin] = useState<boolean>(true)
    const [isVisibleRegister, setIsVisibleRegister] = useState<boolean>(false)

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
            .catch((err) => {
                console.log('err', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

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
                <LoginModal
                    isVisible={isVisibleLogin}
                    setIsVisible={setIsVisibleLogin}
                    setIsVisibleRegister={setIsVisibleRegister}
                />
                <RegisterModal
                    isVisible={isVisibleRegister}
                    setIsVisible={setIsVisibleRegister}
                    setIsVisibleLogin={setIsVisibleLogin}
                />
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
        paddingVertical: 0
    },
    imageItem: {
        marginRight: 20,
        marginTop: 20,
        width: (Constant.screen.width - 60) / 2,
        borderRadius: 5
    }
})
