import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import HeaderDefault from '../common/HeaderDefault'
import i18n from 'i18next'
import RNProgressHud from 'progress-hud'
import Util from '../../controller/Util'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

type Props = {}

const languages = [
    {
        title: 'Tiếng Việt',
        type: 'vn'
    },
    {
        title: 'English',
        type: 'en'
    }
]

const ChangeLanguage = (props: Props) => {
    const navigation = useNavigation()
    const { t: lang } = useTranslation()

    const handleOnSwitchLang = (type: string): void => {
        i18n.changeLanguage(type).then(() => {
            Util.showAlertSuccess(lang('notify.changeLanguageSuccess'))
            navigation.goBack()
        })
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={{
                ...styles.item,
                backgroundColor:
                    i18n.language == item.type
                        ? Constant.color.yellow
                        : Constant.color.grayBackground
            }}
            activeOpacity={0.8}
            onPress={() => {
                handleOnSwitchLang(item.type)
            }}
        >
            <Text style={styles.textLanguage}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <HeaderDefault title={lang('common.language')} />
                <FlatList
                    data={languages}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        margin: 20
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ChangeLanguage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor
    },
    item: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Constant.color.grayBackground,
        borderRadius: 10,
        marginBottom: 10
    },
    textLanguage: {
        color: Constant.color.text,
        fontSize: 16,
        fontFamily: Constant.fonts.robotoSlabSemiBold
    }
})
