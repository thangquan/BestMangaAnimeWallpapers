import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Header = (props: Props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Icon name='arrow-back-outline' size={35} color={'#fff'} />
            </Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-start',
        zIndex: 9999
    }
})
