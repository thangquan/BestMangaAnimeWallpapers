import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Constant from './../../controller/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentFocused } from './../../redux/categorySlice'
import { useNavigation, DrawerActions } from '@react-navigation/native'

type Props = {}

const DrawerContent = (props: Props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const currentCategoryFocus = useSelector((state: any) => state.categorySlice?.currentFocused)

    const renderItem = ({ item, index }: { item: string; index: number }) => {
        return (
            <TouchableOpacity
                style={{
                    ...styles.itemCategory,
                    backgroundColor:
                        currentCategoryFocus == item ? Constant.color.yellow : 'transparent'
                }}
                onPress={() => {
                    handleOnPressItemCategory({
                        data: item,
                        index
                    })
                }}
            >
                <Text
                    style={{
                        ...styles.textTitleCategory,
                        color:
                            currentCategoryFocus == item
                                ? Constant.color.backgroundColor
                                : Constant.color.text
                    }}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    const handleOnPressItemCategory = (item: object) => {
        navigation.dispatch(DrawerActions.toggleDrawer())
        dispatch(updateCurrentFocused(item))
    }

    return (
        <View style={styles.drawerContent}>
            <Text style={styles.title}>Waifu Pictures</Text>
            <FlatList
                data={Constant.categories}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    },
    title: {
        marginVertical: 20,
        fontSize: 26,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        color: Constant.color.text,
        textAlign: 'center'
    },
    itemCategory: {
        borderWidth: 0.33,
        borderColor: '#3F4E4F',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textTitleCategory: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
