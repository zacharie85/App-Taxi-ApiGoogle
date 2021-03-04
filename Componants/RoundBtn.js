import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import {Ionicons} from "@expo/vector-icons"

const RoundBtn = ({iconame,onPress}) =>{
    const  {container, iconStyle} = styles;

    return(
        <TouchableOpacity onPress = {onPress}>
            <View style= {container}>
                <Ionicons style = {iconStyle} name = {iconame}/>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2dbb54',
      alignItems: 'center',  // Enfant
      justifyContent: 'center',   //Enfant
      height:80,
      width:80,
      borderRadius:40,
    },
    iconStyle:{
        fontSize:45,
        color: "#fff"
    }
  });

  export default RoundBtn