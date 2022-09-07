import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../../controller/Constant'
import FastImage from 'react-native-fast-image'
import { StackActions, useNavigation } from '@react-navigation/native'

type Props = {
    uri: string
    width: number
}

const CardImage = ({ uri = '', width }: Props) => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState<boolean>(true)

    const handleShowImageDetail = (): void => {
        navigation.dispatch(
            StackActions.push(Constant.screenName.ImageDetail, {
                imageUrl: uri
            })
        )
    }

    return (
        <Pressable disabled={loading} onPress={handleShowImageDetail}>
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
        </Pressable>
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
