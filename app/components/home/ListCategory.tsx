import { FlatList, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useRef, useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentFocused } from './../../redux/categorySlice'
import Constant from '../../controller/Constant'

interface Props {
    data: Array<string>
}

const colorBr = 'rgba(243, 250, 162, 0.23)'

const ListCategory = ({ data }: Props) => {
    const dispatch = useDispatch()
    const refFlatList = useRef<FlatList>(null)
    const indexCategoryFocus = useSelector((state: any) => state.categorySlice.currentIndex)
    const colors = useSelector((state: any) => state.themeSlice.colors)

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <TouchableOpacity
            style={{
                ...styles.listCategory,
                backgroundColor: indexCategoryFocus == index ? '#fcba03' : colorBr
            }}
            onPress={() => {
                handleOnPressItemCategory(item, index)
            }}
        >
            <Text
                style={{
                    ...styles.textCategory,
                    color: indexCategoryFocus == index ? '#000' : colors.text
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    )

    const handleOnPressItemCategory = (item: string, index: number): void => {
        dispatch(
            updateCurrentFocused({
                data: item,
                index
            })
        )
    }

    const handleOnScrollToItem = (index: number) => {
        if (refFlatList.current) {
            refFlatList.current.scrollToIndex({
                index
            })
        }
    }

    useEffect(() => {
        handleOnScrollToItem(indexCategoryFocus)
    }, [indexCategoryFocus])
    return (
        <View style={styles.container}>
            <FlatList
                ref={refFlatList}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default ListCategory

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginRight: -20
    },
    listCategory: {
        padding: 4,
        paddingHorizontal: 12,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(243, 250, 162, 0.23)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCategory: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
