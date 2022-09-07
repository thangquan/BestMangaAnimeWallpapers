import { StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../../controller/Constant'
import AutoHeightImage from 'react-native-auto-height-image'
import FastImage from 'react-native-fast-image'

type Props = {
    uri: string
    width: number
}

const CardImage = ({ uri = '', width }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <View>
            {loading && (
                <Image
                    source={Constant.icons.loading}
                    style={{ ...styles.imgTmp, width, height: (width / 3) * 4 }}
                />
            )}
            <FastImage
                source={{ uri }}
                style={{ ...styles.imageItem, width, height: (width / 3) * 4 }}
                onLoadEnd={() => {
                    setLoading(false)
                }}
            />
        </View>
    )
}

export default React.memo(CardImage)

const styles = StyleSheet.create({
    imgTmp: {
        position: 'absolute',
        marginRight: 5,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: '#2e2e2e'
    },
    imageItem: {
        marginRight: 5,
        marginTop: 5,
        borderRadius: 5
    }
})
