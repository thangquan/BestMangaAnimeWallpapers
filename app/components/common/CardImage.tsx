import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../home/controller/Constant'
import AutoHeightImage from 'react-native-auto-height-image'
import FastImage from 'react-native-fast-image'

type Props = {
    uri: string
    width?: number
}

const CardImage = ({ uri = '', width = (Constant.screen.width - 60) / 2 }: Props) => {
    const [sizeImage, setSizeImage] = useState<any>({
        width: width,
        height: 0
    })
    const [loading, setLoading] = useState<boolean>(true)

    const getSizeImage = (uri: string): void => {
        console.log('1')
        Image.getSize(uri, (width, height) => {
            setSizeImage({
                width: width,
                height: height
            })
            console.log('2')
            setLoading(false)
        })
        console.log('3')
    }
    useEffect(() => {
        getSizeImage(uri)
    }, [])

    if (loading) {
        return <ActivityIndicator size='small' color='#0000ff' />
    }

    return <FastImage source={{ uri }} style={{ ...styles.imageItem, width, ...sizeImage }} />
}

export default React.memo(CardImage)

const styles = StyleSheet.create({
    imageItem: {
        marginRight: 20,
        marginTop: 20,
        width: (Constant.screen.width - 60) / 2,
        borderRadius: 5
    }
})
