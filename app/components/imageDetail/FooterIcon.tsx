import { Alert, Pressable, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import RNProgressHud from 'progress-hud'
import RNFetchBlob from 'rn-fetch-blob'
import Util from '../../controller/Util'
import CameraRoll from '@react-native-community/cameraroll'

type Props = {
    imageUrl: string
}

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

const FooterIcon = ({ imageUrl }: Props) => {
    const handleOnClickItem = (type: string): void => {
        switch (type) {
            case 'download':
                handleOnDownloadImage()
                break

            default:
                break
        }
    }

    const getExtension = (filename: string) => {
        // To get the file extension
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
    }

    const handleOnDownloadImage = async (): Promise<void> => {
        let checkPermissions = await Util.hasLibraryPermission()
        if (!checkPermissions) {
            return
        }
        if (Util.isIOS()) {
            CameraRoll.save(imageUrl, { type: 'photo' }).then((onfulfilled) => {
                handleOnDownloadImageSuccess()
            })
            return
        }
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let ext: any = getExtension(imageUrl)
        ext = '.' + ext[0]
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
                    ext,
                description: 'Image'
            }
        }
        config(options)
            .fetch('GET', imageUrl)
            .then((res: any) => {
                handleOnDownloadImageSuccess()
            })
    }

    const handleOnDownloadImageSuccess = (): void => {
        Util.showAlertSuccess('Downloaded Successfully.')
    }

    return (
        <View style={styles.footer}>
            {listIcon.map((icon) => (
                <TouchableOpacity
                    style={styles.viewItem}
                    key={icon.type}
                    onPress={() => {
                        handleOnClickItem(icon.type)
                    }}
                >
                    <View style={styles.item}>
                        <Icon
                            name={icon.iconName}
                            size={26}
                            color={Constant.color.text}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.title}>{icon.title}</Text>
                </TouchableOpacity>
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
