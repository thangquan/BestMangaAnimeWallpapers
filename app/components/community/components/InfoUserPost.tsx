import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Constant from '../../../controller/Constant'
import Icon from 'react-native-vector-icons/Ionicons'
import UserModel from '../../../model/UserModel'
import PostModel from '../../../model/PostModel'
import Util from '../../../controller/Util'
import { refActionPostSheet } from './ActionSheetPost'
import { useSelector } from 'react-redux'

type Props = {
    data: PostModel
}

const InfoUserPost = ({ data }: Props) => {
    const { name, avatarUrl } = data?.user
    const currentUser: UserModel = useSelector((state: any) => state.userSlice?.data)
    const handleActionPost = (): void => {
        refActionPostSheet.current?.open()
    }

    const checkIsMyPost = (): boolean => {
        return currentUser.id == data.idUser
    }

    return (
        <View style={styles.infoUserPost}>
            <View style={styles.viewAvatar}>
                <FastImage
                    source={
                        avatarUrl
                            ? {
                                  uri: avatarUrl,
                              }
                            : Constant.icons.avatarDefault
                    }
                    style={styles.avatar}
                />
            </View>
            <View style={styles.viewName}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.timePost}>{Util.calculateElapsedTime(data.created)}</Text>
            </View>
            {checkIsMyPost() && (
                <View style={styles.morePost}>
                    <TouchableOpacity style={styles.btnMorePost} onPress={handleActionPost}>
                        <Icon name='ellipsis-horizontal' size={26} color={Constant.color.text} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default React.memo(InfoUserPost)

const styles = StyleSheet.create({
    infoUserPost: {
        flexDirection: 'row',
    },
    viewAvatar: {},
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    viewName: {
        marginLeft: 6,
        paddingVertical: 4,
    },
    name: {
        fontSize: 16,
        color: Constant.color.text,
        fontFamily: Constant.fonts.robotoSlabMedium,
    },
    timePost: {
        marginTop: 2,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.robotoSlabRegular,
        fontSize: 12,
    },
    morePost: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    btnMorePost: {
        paddingVertical: 4,
    },
})
