import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RouteProp, useRoute } from '@react-navigation/native'
import Constant from '../../controller/Constant'
import Header from './Header'
import FastImage from 'react-native-fast-image'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RootRouteProps } from '../navigation/RootNavigation'
import FooterIcon from './FooterIcon'
import ImageZoom from 'react-native-image-pan-zoom'
import ImageViewer from 'react-native-image-zoom-viewer'

type Props = {
    imageUri: string
}

const ImageDetail = () => {
    const route = useRoute<RootRouteProps<'ImageDetail'>>()
    const imageUrl: string = route?.params?.imageUrl
    const showFooter: Boolean = route?.params?.showFooter ?? true

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constant.color.backgroundColor }}>
            <View style={styles.container}>
                <Header reportImage={true} />
                <ImageZoom
                    cropWidth={wp(100)}
                    cropHeight={hp(100)}
                    imageWidth={wp(100)}
                    imageHeight={hp(100)}
                >
                    <FastImage
                        source={{
                            uri: imageUrl,
                        }}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </ImageZoom>
                {showFooter && <FooterIcon imageUrl={imageUrl} />}
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ImageDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
    },
    image: {
        width: wp(100),
        height: hp(100),
        resizeMode: 'contain',
    },
})
