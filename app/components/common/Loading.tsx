import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import Constant from '../../controller/Constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type Props = {}

const Loading = (props: Props) => {
    return (
        <View style={styles.loading}>
            <Image source={Constant.icons.loadingCute} style={styles.image} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: wp(50),
        height: wp(50),
        resizeMode: 'contain'
    }
})
