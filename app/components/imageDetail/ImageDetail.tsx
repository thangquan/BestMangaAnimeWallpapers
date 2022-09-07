import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RouteProp, useRoute } from '@react-navigation/native'

type Props = {
    imageUri: string
}

const ImageDetail = () => {
    const route = useRoute()

    return (
        <View style={styles.container}>
            <Icon name='arrow-back-outline' size={30} color={'#fff'} />
            <Text>ImageDetail</Text>
        </View>
    )
}

export default ImageDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
