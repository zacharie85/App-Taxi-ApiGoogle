import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions } from 'react-native';
const {width} = Dimensions.get("window");
import Logo from '../assets/images/google.png'
import Title from "./Title"
const LoginBtn = ({onPress}) =>{

const {container,logo} = styles;
  return (
    <TouchableOpacity onPress = {onPress}>
        <View style={container}>
          <Title size = "small" content ="Google Connexion"/>
          <Image style = {logo} source = {Logo}/>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
logo:{
  width: 40,
  height: 40
},
container:{
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: width-80,
  height: 55,
  shadowColor: "black",
  shadowOffset: {width: 0,height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor:"white",
  borderRadius: 10
}
});
export default LoginBtn
