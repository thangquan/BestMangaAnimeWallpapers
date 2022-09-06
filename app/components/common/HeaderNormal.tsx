import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
type Props = {}

const HeaderNormal = (props: Props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.txtHeader}>Best Wallpapers</Text>
            <Icon name='options' size={20} color={'#fff'} />
        </View>
    )
}

export default HeaderNormal

const styles = StyleSheet.create({
    header: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    txtHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Constant.color.text
    }
})
