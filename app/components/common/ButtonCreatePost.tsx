import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import Constant from '../../controller/Constant'
import { updateStateModalLogin } from '../../redux/userSlice'

type Props = {}

const ButtonCreatePost = (props: Props) => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: any) => state.userSlice?.data)
    const handleOnCreatePost = (): void => {
        if (currentUser.id) {
            navigation.navigate(Constant.screenName.CreatePost)
        } else {
            dispatch(updateStateModalLogin(true))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleOnCreatePost}
                style={styles.btnCreate}
            >
                <Icon5 name='plus' size={22} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default ButtonCreatePost

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    btnCreate: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(15),
        backgroundColor: Constant.color.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
