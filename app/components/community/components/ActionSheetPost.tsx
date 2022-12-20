import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { createRef } from 'react'
import PostModel from '../../../model/PostModel'
import Constant from '../../../controller/Constant'
import RBSheet from 'react-native-raw-bottom-sheet'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    dataPost?: PostModel
    handleOnDeletePost?: () => void
}

type ItemAction = {
    onPress?: () => void
    icon: string
    colorIcon?: string
    sizeIcon?: number
    title: string
}

export const refActionPostSheet = createRef<RBSheet>()

const ItemAction = ({
    onPress,
    icon,
    title,
    colorIcon = 'rgba(255, 255, 255,0.9)',
    sizeIcon = 24,
}: ItemAction) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <Icon name={icon} color={colorIcon} size={sizeIcon} />
                <Text style={styles.txtItem}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ActionSheetPost = ({ dataPost, handleOnDeletePost }: Props) => {
    return (
        <RBSheet
            ref={refActionPostSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: styles.wrapper,
                container: styles.container,
            }}
        >
            <View style={styles.body}>
                <ItemAction title={'Delete'} icon='trash-outline' onPress={handleOnDeletePost} />
            </View>
        </RBSheet>
    )
}

export default ActionSheetPost

const styles = StyleSheet.create({
    body: {
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        padding: 14,
        alignItems: 'center',
    },
    txtItem: {
        marginHorizontal: 18,
        fontSize: 18,
        color: 'rgba(255, 255, 255,0.9)',
        fontFamily: Constant.fonts.robotoSlabSemiBold,
    },
    wrapper: {
        backgroundColor: 'rgba(0, 0, 0,0.4)',
    },
    container: {
        height: 'auto',
        minHeight: 200,
        paddingBottom: 20,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        backgroundColor: Constant.color.postBackgroundColor,
    },
})
