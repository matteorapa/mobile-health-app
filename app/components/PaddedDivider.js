import React from 'react'
import {Divider} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function PaddedDivider() {
    return(
    
    <View style={STYLE.divider}>
        {/* <Divider /> */}
    </View>
    
    )
}

const STYLE = StyleSheet.create({
    divider: {
        marginTop: 12,
        marginBottom: 12,
    }
})