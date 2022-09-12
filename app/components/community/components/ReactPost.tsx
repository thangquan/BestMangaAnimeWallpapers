import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../../controller/Constant'

type Props = {}

const ReactPost = (props: Props) => {
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
                <Text style={styles.textCountLover}>6,969 likes | </Text>
                <Text style={styles.textCountLover}>6,969 comments</Text>
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
        flexDirection: 'row'
    },
    textCountLover: {
        fontSize: 13,
        color: Constant.color.grayText,
        fontFamily: Constant.fonts.poppinsRegular
    }
})
