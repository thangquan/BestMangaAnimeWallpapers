import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Constant from './../../controller/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentFocused } from './../../redux/categorySlice'
import {
    useNavigation,
    DrawerActions,
    NavigationProp,
    StackActions
} from '@react-navigation/native'

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
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Constant.color.backgroundColor
            }}
        >
            <View style={styles.drawerContent}>
                <Text style={styles.title}>Waifu Pictures</Text>
                <FlatList
                    data={Constant.categories}
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={styles.privacy}>
                <TouchableOpacity
                    style={styles.btnPrivacy}
                    activeOpacity={0.6}
                    onPress={(): void => {
                        navigation.navigate(Constant.screenName.Privacy)
                    }}
                >
                    <Text style={styles.textPrivacy}>Privacy Policy</Text>
                </TouchableOpacity>
                <View style={styles.driver} />
                <TouchableOpacity
                    style={styles.btnPrivacy}
                    activeOpacity={0.6}
                    onPress={(): void => {
                        navigation.navigate(Constant.screenName.TermsPage)
                    }}
                >
                    <Text style={styles.textPrivacy}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    },
    privacy: {
        marginHorizontal: 20,
        paddingVertical: 10
    },
    btnPrivacy: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    textPrivacy: {
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabRegular
    },
    driver: {
        height: 0.5,
        marginHorizontal: 10,
        backgroundColor: Constant.color.text
    }
})
