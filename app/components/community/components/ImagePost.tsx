import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
type Props = {
    imageUrl: string
}

const ImagePost = ({ imageUrl }: Props) => {
    return (
        <View style={styles.imagePostContainer}>
            <FastImage
                source={{
                    uri: imageUrl
                }}
                style={styles.image}
            />
        </View>
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
