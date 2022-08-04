import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constant from './controller/Constant'
import HeaderNormal from '../common/HeaderNormal'
import CommonAPIs from './controller/APIs/CommonAPIs'
import AutoHeightImage from 'react-native-auto-height-image'
import CardImage from '../common/CardImage'

type Props = {}

const Home = (props: Props) => {
    const [listCharacters, setListCharacters] = useState<any[]>([])
    const [listMangaAnime, setListMangaAnime] = useState<any[]>([])
    const [listPopular, setListPopular] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        CommonAPIs.getAllPopular()
            .then((res) => {
                setListCharacters(res?.characters)
                setListMangaAnime(res?.manga_anime)
                setListPopular(res?.popular)
            })
            .catch((err) => {
                console.log('err', err)
            })
            .finally(() => {})
        CommonAPIs.getImageByCategory('cry')
            .then((res) => {
                console.log('res', res)
                setData(res)
            })
            .catch((err) => {
                console.log('err', err)
            })
            .finally(() => {})
    }, [])

    return (
        <View style={styles.container}>
            <HeaderNormal />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <CardImage uri={item} />
                    // <Image source={{ uri: item }} style={styles.imageItem} />
                    // <AutoHeightImage
                    //     width={Constant.screen.width - 40}
                    //     source={{ uri: item }}
                    //     // style={styles.imageItem}
                    // />
                )}
                // numColumns={2}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
        padding: 20,
        paddingTop: 0
    },
    imageItem: {
        marginRight: 20,
        marginTop: 20,
        width: (Constant.screen.width - 60) / 2,
        borderRadius: 5
    }
})
