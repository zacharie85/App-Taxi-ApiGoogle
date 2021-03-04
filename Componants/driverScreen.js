import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,Dimensions ,Alert, Platform,Linking} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import constants from "expo-constants";
import SocketIO from "socket.io-client";
import { SERVER_URL } from '../utils/helpers';

const {width,height} = Dimensions.get("window");
const initialState = {latitude: null, longitude : null, coordinates:[], destinationCoords: null,taxiOk: false};

let io;
const DriverScreen = (props) => {

    const [state, setState] = useState(initialState);
    const {latitude, longitude,destinationCoords,taxiOk} = state;
    const openMaps = (latitude,longitude)=>{
        setState(prevState => ({
            ...prevState,
            taxiOk:true
        }));
    
        const androidUrl = `geo:0,0?q=${latitude},${longitude}(destination)`;
        const iosUrl = `http://maps.apple.com?addr=${latitude},${longitude}`;

        const url = Platform.OS === "ios" ? iosUrl : androidUrl;

        Linking.openURL(url);
    }


    const searchPassenger = ({lat,long}) =>{
        io = SocketIO.connect(SERVER_URL);
        io.on("connect",()=>{
            console.log("Connexion taxi reussie");
            io.emit('requestPassenger',{lat,long});
            io.on('requestTaxi',passInfo =>{
                setState(prevState => ({
                    ...prevState,
                    destinationCoords:{
                        latitude: passInfo.latitude,
                        longitude:passInfo.longitude
                    }
                
                }));
                // afiihcer une alert pour demande si il est Ok
                Alert.alert(
                    "Passager trouver",
                    "Acceptez vous la course?",
                    [
                        {
                            text:"Refuser",
                            onPress:() =>{}
                        },
                        {
                            text:"Accepter",
                            onPress:() =>{
                                // ouvrire googleMap
                                openMaps(passInfo.latitude,passInfo.longitude);
                            }
                        },
                    ]
                )
            })
        })
    };

    useEffect(()=>{
        if(taxiOk){
            io.emit('requestPassenger',{lat:latitude,long:longitude});
        };
    },[taxiOk])

    const getUserLocation = async() =>{
        try {
            const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
            setState(prevState => ({
                ...prevState,
                latitude,
                longitude
            }));
            searchPassenger({latitude,longitude});
        } catch (error) {
            console.error('error de loading des coordonees',error);
        }
    };
    
    useEffect(()=>{
        return() =>io.emit('quit',"taxi");
    },[])

    const {container,mapStyle,mySpiner} = styles;
    useEffect(() =>{
        getUserLocation();
    },[]);


    if(!latitude || !longitude){
        return(
            <View  style = {container}>
                 <ActivityIndicator size="large"/>
            </View>
        )
    };
    return (
    
            <View style= {container}>
                <MapView style= {mapStyle} showsUserLocation followsUserLocation 
                        region ={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta:0.020
                        }}/>
                          {!destinationCoords && (
                          <View  style = {mySpiner}>
                                    <ActivityIndicator size="large" color="#fff"/>
                            </View>
                            )}
             </View>
     
    )
};


const styles = StyleSheet.create({
    container: {
      marginTop: constants.statusBarHeight,
      alignItems:'center',
      justifyContent: 'center',
      flex:1,
      flexDirection: "column",
    },
    mapStyle:{
        width: width,
        height: height
    },
    mySpiner:{
        position:"absolute",
        backgroundColor:"green",
        justifyContent:"center",
        width:60,
        height:60,
        alignItems:'center',
        borderRadius:30,
        bottom:10
    }
  });

export default DriverScreen