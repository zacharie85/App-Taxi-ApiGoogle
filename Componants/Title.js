import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';


const Title = ({content,size}) =>{
  const {container, title,small,medium} = styles;

// retounre le title en fonction  de la taille
  const getTitleSize = () =>{
    switch (size) {
      case "big":
        return title;
      case "small":
        return small;
      case "medium" :
        return medium;
    }
  }
  return (
    <View style = {container}>
        <Text style = {getTitleSize()}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 30,
    color:'white',
    fontWeight: 'bold',
    fontFamily: "LeckerliOne-Regular"
  },
  small:{
    color: 'rgba(0,0,0,0.6)',
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 28
  },
  medium:{
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28
  }
});

export default Title
