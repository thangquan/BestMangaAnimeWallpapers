import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size='large' color='#0000ff' />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
