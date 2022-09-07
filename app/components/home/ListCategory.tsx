import { FlatList, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useRef } from 'react'
import FastImage from 'react-native-fast-image'

interface Props {
    data: Array<string>
    categoryFocus: string
    setCategoryFocus: Function
}

const colorBr = 'rgba(243, 250, 162, 0.23)'

const ListCategory = ({ data, categoryFocus, setCategoryFocus }: Props) => {
    const refFlatList = useRef<FlatList>(null)

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <TouchableOpacity
            style={{
                ...styles.listCategory,
                backgroundColor: categoryFocus == item ? '#fcba03' : colorBr
            }}
            onPress={() => {
                handleOnPressItemCategory(item, index)
            }}
        >
            <Text
                style={{
                    ...styles.textCategory,
                    color: categoryFocus == item ? '#000' : '#fff'
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    )

    const handleOnPressItemCategory = (item: string, index: number): void => {
        setCategoryFocus(item)
        if (refFlatList.current) {
            refFlatList.current.scrollToIndex({
                index
            })
        }
    }

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
        fontWeight: 'bold'
    }
})
