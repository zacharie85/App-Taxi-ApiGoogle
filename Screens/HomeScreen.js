import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import constants from "expo-constants";
import Blook from "../Componants/Blook.js"
import Title from '../Componants/Title.js'
import {Ionicons} from "@expo/vector-icons"
const {width} = Dimensions.get("window");
import LoginBtn from '../Componants/loginBtn'
import {prefix,auth} from '../utils/helpers.js'


import RoundBtn from '../Componants/RoundBtn'

const HomeScreen = (props) =>{

const goTo = route => props.navigation.push(route);  // Naviguer vers une vue 

  return (
    <View style = {styles.container}>
        <Blook>
            <Ionicons name={`${prefix}-car`} style ={styles.icon}/>
            <Title content ="TAXI APP" size = "big"/>
        </Blook>
        <View style = {styles.conatiner_2}>
          <View style = {styles.title_Container}>
                <Title content ="Bienvenue" size = "small"/>
                <Title content ="Vous Rechercher un jouer" size = "medium"/>
          </View>
          <View style ={styles.roundBtnContainer}>
                    <RoundBtn iconame ={`${prefix}-car`} onPress ={() => goTo("Passager")} />
                    <RoundBtn iconame ={`${prefix}-person`}  onPress ={() => goTo("Driver")}/>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    marginTop: constants.statusBarHeight,
    flexDirection: 'column',
  },
  icon:{
    fontSize: 80,
    color:"white"
  },
  conatiner_2:{
    flexGrow: 1,
    width,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title_Container:{
    width: width-80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  roundBtnContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      width:width-80,
  }
});

export default HomeScreen
