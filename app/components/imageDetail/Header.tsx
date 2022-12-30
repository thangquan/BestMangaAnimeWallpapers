import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Util from '../../controller/Util'

type Props = {
    reportImage?: boolean
}

const Header = ({ reportImage = false }: Props) => {
    const navigation = useNavigation()

    const handleOnReportImage = (): void => {
        Alert.prompt(
            'Report Image !!!',
            'Enter the problem you need to report, we will solve it as soon as possible',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => reportSuccess(),
                },
            ]
        )
    }

    const reportSuccess = (): void => {
        Util.showAlertSuccess('Your report has been recognized we will solve it soon')
    }

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Icon name='arrow-back-outline' size={35} color={'#fff'} />
            </Pressable>
            <TouchableOpacity onPress={handleOnReportImage}>
                <Icon name='bug-outline' size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-start',
        zIndex: 9999,
    },
})
