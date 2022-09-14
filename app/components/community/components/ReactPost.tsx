import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../../controller/Constant'
import PostModel from '../../../model/PostModel'

type Props = {
    dataPost: PostModel
}

const ReactPost = ({ dataPost }: Props) => {
    const { like, comment } = dataPost

    return (
        <View style={styles.container}>
            <View style={styles.listReact}>
                <TouchableOpacity
                    style={styles.btnReact}
                    onPress={() => {
                        console.log('123')
                    }}
                >
                    <Icon name='heart' size={30} color={Constant.color.heart} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnReact}>
                    <Icon name='chatbubbles-outline' size={26} color={Constant.color.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.countReact}>
                {like ? (
                    <Text style={styles.textCountLover}>
                        {like} like{like > 1 && 's'}
                    </Text>
                ) : null}
                {comment ? (
                    <Text style={styles.textCountLover}>
                        {comment} comment{comment > 1 && 's'}
                    </Text>
                ) : null}
            </View>
        </View>
    )
}

export default ReactPost

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    },
    listReact: {
        flexDirection: 'row'
    },
    btnReact: {
        padding: 5
    },
    countReact: {
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center'
    },
    textCountLover: {
        fontSize: 13,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.poppinsRegular,
        includeFontPadding: false
    },
    driverReact: {
        paddingHorizontal: 3,
        color: Constant.color.grayText,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
