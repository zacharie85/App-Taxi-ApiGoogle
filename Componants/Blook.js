import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';

const {width} = Dimensions.get("window");

const Blook = ({children}) =>{
  return (
    <View style = {styles.container}>
        {children}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: (width * 4) / 3,
    backgroundColor: '#2dbb54',
    flexGrow: 3,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    justifyContent: 'center' , // Les enfants s'aligne
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default Blook
