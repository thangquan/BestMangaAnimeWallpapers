import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import HeaderDefault from '../common/HeaderDefault'
import { WebView } from 'react-native-webview'

type Props = {}

const TermsPage = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <HeaderDefault title='Terms & Conditions' />
            <View style={styles.contentView}>
                <WebView source={{ uri: Constant.termsPageURL }} />
            </View>
        </SafeAreaView>
    )
}

export default TermsPage

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        backgroundColor: Constant.color.grayBG,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    text: {
        marginHorizontal: 16,
        color: Constant.color.text
    }
})
