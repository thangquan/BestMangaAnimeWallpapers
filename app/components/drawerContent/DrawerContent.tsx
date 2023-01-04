import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import Constant from './../../controller/Constant'
import { updateCurrentFocused } from './../../redux/categorySlice'
import StorageManager from '../../controller/StorageManager'

type Props = {}

const DrawerContent = (props: Props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()
    const currentCategoryFocus = useSelector((state: any) => state.categorySlice?.currentFocused)
    const { t: lang } = useTranslation()
    const [role, setRole] = useState<any>(null)

    const renderItem = ({ item, index }: { item: string; index: number }) => {
        return (
            <TouchableOpacity
                style={{
                    ...styles.itemCategory,
                    backgroundColor:
                        currentCategoryFocus == item ? Constant.color.yellow : 'transparent',
                }}
                onPress={() => {
                    handleOnPressItemCategory({
                        data: item,
                        index,
                    })
                }}
            >
                <Text
                    style={{
                        ...styles.textTitleCategory,
                        color:
                            currentCategoryFocus == item
                                ? Constant.color.backgroundColor
                                : Constant.color.text,
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

    const getInitRole = async () => {
        let data = await StorageManager.getData('VIP')
        setRole(data)
        console.log('data: ', data)
    }

    useEffect(() => {
        getInitRole()
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Constant.color.backgroundColor,
            }}
        >
            <View style={styles.drawerContent}>
                <Text style={styles.title}>Waifu Pictures</Text>
                {role ? (
                    <Text style={styles.textRole}>❤️ {role?.name || role?.title} ❤️</Text>
                ) : (
                    <Text />
                )}
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
                    <Text style={styles.textPrivacy}>{lang('profile.privacy')}</Text>
                </TouchableOpacity>
                <View style={styles.driver} />
                <TouchableOpacity
                    style={styles.btnPrivacy}
                    activeOpacity={0.6}
                    onPress={(): void => {
                        navigation.navigate(Constant.screenName.TermsPage)
                    }}
                >
                    <Text style={styles.textPrivacy}>{lang('profile.terms')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnVIP}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer())
                        navigation.navigate(Constant.screenName.PaymentVIP)
                    }}
                >
                    <AnimatedLinearGradient customColors={presetColors.firefox} speed={500} />
                    <Text style={styles.textVip}>Subscriptions Vip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
    },
    title: {
        marginTop: 20,
        fontSize: 26,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        color: Constant.color.text,
        textAlign: 'center',
    },
    itemCategory: {
        borderWidth: 0.33,
        borderColor: '#3F4E4F',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textTitleCategory: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabSemiBold,
    },
    privacy: {
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    btnPrivacy: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    textPrivacy: {
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabRegular,
    },
    driver: {
        height: 0.5,
        marginHorizontal: 10,
        backgroundColor: Constant.color.text,
    },
    btnVIP: {
        height: 40,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 10,
    },
    textVip: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textRole: {
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: Constant.fonts.robotoSlabSemiBold,
        color: Constant.color.text,
    },
})
