import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Constant from '../../../controller/Constant'
import Icon from 'react-native-vector-icons/Ionicons'
import UserModel from '../../../model/UserModel'
import PostModel from '../../../model/PostModel'
import Util from '../../../controller/Util'

type Props = {
    data: PostModel
}

const InfoUserPost = ({ data }: Props) => {
    const { name, avatarUrl } = data?.user

    return (
        <View style={styles.infoUserPost}>
            <View style={styles.viewAvatar}>
                <FastImage
                    source={{
                        uri: avatarUrl
                    }}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.viewName}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.timePost}>{Util.calculateElapsedTime(data.created)}</Text>
            </View>
            <View style={styles.morePost}>
                <TouchableOpacity style={styles.btnMorePost}>
                    <Icon name='ellipsis-horizontal' size={26} color={Constant.color.text} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InfoUserPost

const styles = StyleSheet.create({
    infoUserPost: {
        flexDirection: 'row'
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
    },
    timePost: {
        marginTop: 2,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.robotoSlabRegular,
        fontSize: 12
    },
    morePost: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'flex-end'
    },
    btnMorePost: {
        paddingVertical: 4
    }
})
