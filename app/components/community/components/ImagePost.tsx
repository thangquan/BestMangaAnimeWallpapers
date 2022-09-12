import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation, StackActions } from '@react-navigation/native'
import Constant from '../../../controller/Constant'

type Props = {
    imageUrl: string
}

const ImagePost = ({ imageUrl }: Props) => {
    const navigation = useNavigation()

    const handleOnClickImage = (event: MouseEvent): void => {
        navigation.dispatch(
            StackActions.push(Constant.screenName.ImageDetail, {
                imageUrl
            })
        )
    }

    return (
        <Pressable style={styles.imagePostContainer} onPress={handleOnClickImage}>
            <FastImage
                source={{
                    uri: imageUrl
                }}
                style={styles.image}
            />
        </Pressable>
    )
}

export default ImagePost

const styles = StyleSheet.create({
    imagePostContainer: {
        marginTop: 10
    },
    image: {
        width: wp(100) - 40,
        height: wp(100) - 40,
        borderRadius: 16
    }
})
