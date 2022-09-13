import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackActions, useNavigation } from '@react-navigation/native'
import Constant from '../../controller/Constant'

type Props = {
    imageUrl: string
    handleOnRemoveImage: Function
    containerStyle?: ViewStyle
}

const ImageCreatePost = ({ imageUrl, handleOnRemoveImage, containerStyle }: Props) => {
    const navigation = useNavigation()

    const handleOnClickImage = (event: MouseEvent): void => {
        navigation.dispatch(
            StackActions.push(Constant.screenName.ImageDetail, {
                imageUrl,
                showFooter: false
            })
        )
    }
    return (
        <Pressable onPress={handleOnClickImage} style={{ ...styles.viewImage, ...containerStyle }}>
            <TouchableOpacity
                onPress={() => {
                    handleOnRemoveImage()
                }}
                style={styles.btnRemove}
            >
                <Icon name='close' size={30} color='#fff' />
            </TouchableOpacity>
            <Image
                source={{
                    uri: imageUrl
                }}
                style={styles.image}
            />
        </Pressable>
    )
}

export default ImageCreatePost

const styles = StyleSheet.create({
    viewImage: {
        borderColor: '#333',
        borderWidth: 1,
        marginVertical: 5,
        width: wp(100) - 40,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8
    },
    image: {
        width: '100%',
        borderRadius: 8,
        height: wp(100) - 40
    },
    btnRemove: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: wp(9),
        height: wp(9),
        borderRadius: wp(9),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        zIndex: 1000
    }
})
