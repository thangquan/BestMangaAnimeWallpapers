import { FlatList, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useRef } from 'react'
import FastImage from 'react-native-fast-image'

interface Props {
    data: Array<Category>
    categoryFocus: Category
    setCategoryFocus: Function
}

interface Category {
    id: number
    image: string
    title: string
}

const colorBr = 'rgba(243, 250, 162, 0.23)'

const ListCategory = ({ data, categoryFocus, setCategoryFocus }: Props) => {
    const refFlatList = useRef<FlatList>()

    const renderItem = ({ item, index }: { item: Category }) => (
        <Pressable
            style={{
                ...styles.listCategory,
                backgroundColor: categoryFocus?.id == item?.id ? '#fcba03' : colorBr
            }}
            onPress={() => {
                handleOnPressItemCategory(item, index)
            }}
        >
            <FastImage
                source={{
                    uri: item?.image
                }}
                style={styles.iconCategory}
            />
            <Text
                style={{
                    ...styles.textCategory,
                    color: categoryFocus?.id == item?.id ? '#000' : '#fff'
                }}
            >
                {item.title}
            </Text>
        </Pressable>
    )
    const handleOnPressItemCategory = (item: Category, index: number): void => {
        setCategoryFocus(item)
        refFlatList.current.scrollToIndex({
            index
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={refFlatList}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
            />
        </View>
    )
}

export default ListCategory

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginRight: -20
    },
    listCategory: {
        padding: 4,
        paddingRight: 16,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(243, 250, 162, 0.23)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconCategory: {
        width: 33,
        height: 33,
        borderRadius: 20
    },
    textCategory: {
        marginLeft: 6,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
