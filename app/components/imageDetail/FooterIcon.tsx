import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type Props = {}

const listIcon = [
    {
        iconName: 'download-outline',
        type: 'download',
        title: 'Download'
    },
    {
        iconName: 'heart-outline',
        type: 'heart',
        title: 'Likes'
    },
    {
        iconName: 'image-outline',
        type: 'image',
        title: 'Set'
    },
    {
        iconName: 'information-circle-outline',
        type: 'info',
        title: 'Info'
    }
]

const FooterIcon = (props: Props) => {
    return (
        <View style={styles.footer}>
            {listIcon.map((icon) => (
                <View style={styles.viewItem} key={icon.type}>
                    <View style={styles.item}>
                        <Icon
                            name={icon.iconName}
                            size={26}
                            color={Constant.color.text}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.title}>{icon.title}</Text>
                </View>
            ))}
        </View>
    )
}

export default FooterIcon

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    viewItem: {
        alignItems: 'center'
    },
    item: {
        width: wp(13),
        height: wp(13),
        borderRadius: 4,
        backgroundColor: 'rgba(181, 181, 181, 0.5)',
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'center'
    },
    title: {
        color: Constant.color.grayText,
        textAlign: 'center',
        marginTop: 2,
        fontSize: 12
    }
})
