import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Predictions = ({main_text, secondary_text,onPress}) =>{

    const {secondary, main,container} = styles;
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Text numberOfLines={1} style={secondary}>{secondary_text}</Text>

                <Text style={main}>{main_text}</Text>
            </View>
        </TouchableOpacity>
       
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        borderTopWidth:1,
        borderTopColor:"#f6f6f6",
        padding: 5,
    },
    secondary:{
        color:"#d6d6d6",
        fontSize:12,
        fontWeight:"300",
        fontFamily:"Poppins-Regular"
    },
    main:{
        color:"black",
        fontSize:16,
        fontWeight:"700",
        fontFamily:"Poppins-Regular"
    }
})


export default Predictions