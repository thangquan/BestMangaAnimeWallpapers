import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Constant from '../../controller/Constant'
import { useSelector } from 'react-redux'

type Props = {}

const InfoUser = (props: Props) => {
    const { avatarUrl, name } = useSelector((state: any) => state.userSlice.data)

    return (
        <View style={styles.infoUserPost}>
            <View style={styles.viewAvatar}>
                <Image
                    source={
                        avatarUrl
                            ? {
                                  uri: avatarUrl
                              }
                            : Constant.icons.avatarDefault
                    }
                    style={styles.avatar}
                />
            </View>
            <View style={styles.viewName}>
                <Text style={styles.name}>{name}</Text>
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
        marginLeft: 10,
        paddingVertical: 4
    },
    name: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabMedium
    }
})
