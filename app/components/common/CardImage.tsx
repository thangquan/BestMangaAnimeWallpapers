import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constant from '../home/controller/Constant'
import AutoHeightImage from 'react-native-auto-height-image'
import FastImage from 'react-native-fast-image'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    uri: string
    width?: number
}

const CardImage = ({ uri = '', width = (wp(100) - 60) / 2 }: Props) => {

    const [loading, setLoading] = useState<boolean>(true)
    
    return <FastImage source={{ uri }} style={styles.imageItem} />
}

export default React.memo(CardImage)

const styles = StyleSheet.create({
    imageItem: {
        marginRight: 5,
        marginTop: 5,
        width: (wp(100) - 30) / 3,
        height: wp(45),
        borderRadius: 2
    }
})
