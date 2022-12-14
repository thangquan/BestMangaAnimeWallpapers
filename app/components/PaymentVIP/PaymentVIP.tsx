import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Constant from '../../controller/Constant'
import HeaderDefault from '../common/HeaderDefault'
import RNIap, {
    requestPurchase,
    requestSubscription,
    useIAP,
    withIAPContext,
} from 'react-native-iap'
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Util from '../../controller/Util'
import StorageManager from '../../controller/StorageManager'
import { createDispatchHook, useDispatch } from 'react-redux'
import { updateRoleUser } from '../../redux/userSlice'

const itemsProducts: any = Platform.select({
    ios: ['coin0', 'coin1', 'coin2', 'coin3', 'coin4', 'coin5'],
    android: ['coin0', 'coin1', 'coin2', 'coin3', 'coin4', 'coin5'],
})

const itemsSubscriptions: any = Platform.select({
    ios: ['sub0'],
    android: ['paisen', 'vip1', 'thang'],
})

const PaymentVIP = () => {
    const { connected, subscriptions, products, getProducts, getSubscriptions } = useIAP()
    const dispatch = useDispatch()

    const getProductsAndPurchases = async () => {
        await getProducts({ skus: itemsProducts })
        await getSubscriptions({ skus: itemsSubscriptions })
    }

    const getColor = (index: number): void => {
        switch (index) {
            case 0:
                return presetColors.instagram
            case 1:
                return presetColors.firefox
            case 2:
                return presetColors.sunrise
            default:
                return presetColors.instagram
        }
    }

    const handlePurchase = async (sku: any) => {
        if (Util.isAndroid()) {
            await requestPurchase({ skus: [sku.productId] }).then((res: any) => {
                dispatch(updateRoleUser(sku))
            })
        } else {
            await requestPurchase({ sku: sku.productId }).then((res: any) => {
                dispatch(updateRoleUser(sku))
            })
        }
    }

    const handleSub = async (sku: any) => {
        if (Util.isAndroid() || true) {
            let offerToken: string = sku.subscriptionOfferDetails
                ? sku.subscriptionOfferDetails[0].offerToken
                : ''
            await requestSubscription({
                sku: sku.productId,
                subscriptionOffers: [{ sku: sku.productId, offerToken }],
            }).then((res: any) => {})
        } else {
        }
    }

    useEffect(() => {
        if (connected) {
            getProductsAndPurchases()
        }
    }, [connected])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <HeaderDefault title={'Payment VIP'} />
                {products
                    .sort((a: any, b: any) => a.price - b.price)
                    .map((product: any, index) => {
                        return (
                            <TouchableOpacity
                                key={product.productId}
                                onPress={() => {
                                    handlePurchase(product)
                                }}
                                style={styles.btnItem}
                            >
                                <AnimatedLinearGradient
                                    customColors={getColor(index)}
                                    speed={500}
                                />
                                <Text style={styles.textItem}>
                                    {product.name || product.title} ({product.localizedPrice})
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                {/* {subscriptions.map((product: any, index) => {
                    return (
                        <TouchableOpacity
                            key={product.productId}
                            onPress={() => {
                                handleSub(product)
                            }}
                            style={styles.btnItem}
                        >
                            <AnimatedLinearGradient customColors={getColor(index)} speed={1000} />
                            <Text style={styles.textItem}>{product.title}</Text>
                        </TouchableOpacity>
                    )
                })} */}
            </View>
        </SafeAreaView>
    )
}

export default withIAPContext(PaymentVIP)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.backgroundColor,
    },
    btnItem: {
        marginHorizontal: 24,
        marginTop: 20,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    textItem: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
})
