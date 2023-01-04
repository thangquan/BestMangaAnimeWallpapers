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

const itemsProducts: any = Platform.select({
    ios: ['coin0'],
    android: ['coin0', 'coin1', 'coin2', 'coin3', 'coin4', 'coin5'],
})

const itemsSubscriptions: any = Platform.select({
    ios: ['coin0'],
    android: ['paisen', 'vip1', 'thang'],
})

const PaymentVIP = () => {
    const { connected, subscriptions, products, getProducts, getSubscriptions } = useIAP()

    const getProductsAndPurchases = async () => {
        await getProducts({ skus: itemsProducts })
        await getSubscriptions({ skus: itemsSubscriptions })
    }

    useEffect(() => {
        if (connected) {
            getProductsAndPurchases()
        }
    }, [connected])

    const handlePurchase = async (sku: any) => {
        console.log('sku', sku)
        await requestPurchase({ skus: [sku] }).then((res: any) => {})
        // await requestSubscription({
        //     sku: sku,
        //     subscriptionOffers: sku?.subscriptionOfferDetails[0],
        // }).then((res: any) => {
        //     console.log('res123123: ', res)
        // })
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <HeaderDefault title={'Payment VIP'} />
                {products.map((product, index) => {
                    return (
                        <TouchableOpacity
                            key={product.productId}
                            onPress={() => {
                                handlePurchase(product.productId)
                            }}
                            style={styles.btnItem}
                        >
                            <AnimatedLinearGradient customColors={getColor(index)} speed={500} />
                            <Text style={styles.textItem}>
                                {product?.name} ({product.price})
                            </Text>
                        </TouchableOpacity>
                    )
                })}
                {/* {subscriptions.map((product, index) => {
                    return (
                        <TouchableOpacity
                            key={product.productId}
                            onPress={() => {
                                handlePurchase(product)
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
