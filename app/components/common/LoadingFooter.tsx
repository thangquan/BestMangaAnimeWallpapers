import { StyleSheet, Text, View, ImageStyle, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type Props = {
    iconStyle?: StyleProp<ImageStyle> | undefined
    containerStyle?: StyleProp<ViewStyle> | undefined
}

const LoadingFooter = ({ iconStyle, containerStyle }: Props) => {
    return (
        <View style={{ ...styles.loading, ...(containerStyle as object) }}>
            <Image
                source={Constant.icons.loadingFooter}
                style={{ ...styles.image, ...(iconStyle as object) }}
            />
        </View>
    )
}

export default LoadingFooter

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: wp(15),
        height: wp(15),
        resizeMode: 'contain'
    }
})
