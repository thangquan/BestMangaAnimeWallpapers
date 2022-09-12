import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'

type Props = {}

const InfoUser = (props: Props) => {
    return (
        <View style={styles.infoUserPost}>
            <View style={styles.viewAvatar}>
                <FastImage
                    source={{
                        uri: 'https://picsum.photos/200/300'
                    }}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.viewName}>
                <Text style={styles.name}>Emi Fukada</Text>
            </View>
        </View>
    )
}

export default InfoUser

const styles = StyleSheet.create({
    infoUserPost: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewAvatar: {},
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    viewName: {
        marginLeft: 6,
        paddingVertical: 4
    },
    name: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabMedium
    }
})
