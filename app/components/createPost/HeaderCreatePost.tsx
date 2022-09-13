import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
import { useNavigation } from '@react-navigation/native'

type Props = {
    handleOnCreatePost: Function
}

const HeaderCreatePost = ({ handleOnCreatePost }: Props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Icon name='arrow-back-outline' size={26} color={Constant.color.text} />
            </TouchableOpacity>
            <Text style={styles.text}>Post</Text>
            <TouchableOpacity
                style={styles.btnCreate}
                onPress={() => {
                    handleOnCreatePost()
                }}
            >
                <Text style={styles.txtCreate}>Publich</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderCreatePost

const styles = StyleSheet.create({
    header: {
        padding: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.4
    },
    text: {
        marginLeft: 20,
        fontSize: 18,
        color: Constant.color.text,
        fontFamily: Constant.fonts.poppinsSemiBold
    },
    btnCreate: {},
    txtCreate: {
        fontSize: 16,
        color: Constant.color.blue,
        fontFamily: Constant.fonts.poppinsRegular
    }
})
