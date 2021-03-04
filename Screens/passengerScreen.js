import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,Dimensions, TouchableWithoutFeedback,Keyboard, Alert } from 'react-native';
import MapView,{Polyline,Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import constants from "expo-constants";
import PlaceInput from "../Componants/PlaceInput";
import {BASE_URL,API_KEY,getRoute,decodePoint, SERVER_URL} from '../utils/helpers'

import SocketIO from 'socket.io-client';

let io;
import taxi_logo from '../assets/images/taxi.png'

const {width,height} = Dimensions.get("window");
const initialState = {latitude: null, longitude : null, coordinates:[], destinationCoords: null,taxiCorrds: null};

const PassengerScreen = (props) => {

    const mapView = useRef();
    const [state, setState] = useState(initialState);
    const {latitude, longitude,coordinates,destinationCoords, taxiCorrds} = state;

    const connectSocket = ()=>{
        io = SocketIO.connect(SERVER_URL);
        io.on("connect", () =>{
            console.log("Connexion passager reussie");
        });
        io.on('requestPassenger',taxiInfo =>{
             // alert le taxi est en route
             Alert.alert("Taxi en route");
            setState(prevState => ({
                ...prevState,
                taxiCorrds:{
                    latitude: taxiInfo.lat,
                    longitude: taxiInfo.long
                }
             
            }));
           
        })
    };
    const getUserLocation = async() =>{
        try {
            const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
            setState(prevState => ({
                ...prevState,
                latitude,
                longitude
            }));
            connectSocket();
        } catch (error) {
            console.error('error de loading des coordonees',error);
        }
    };
 // Lorque le composant est demonter 
    useEffect(() =>{
        if(taxiCorrds){
            mapView.current.fitToCoordinates([...coordinates, taxiCorrds],{
                animated: true,
                edgePadding:{
                    top: 110,
                    bottom: 40,
                    left:40,
                    right:40
                }
            });
        };
    },[taxiCorrds])

    useEffect(()=>{
        return() =>io.emit('quit',"pass");
    },[]);

    const {container,mapStyle,taxiStyle,mySpiner} = styles;
    useEffect(() =>{
        getUserLocation();
    },[]);

    const handlePredictionPress = async place_id =>{
        try {
            const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;
            console.log("url = ", url);
            const points = await getRoute(url);
            const coordinates = decodePoint(points);
            setState(prevState =>({
                ...prevState,
                coordinates,
                destinationCoords: coordinates[coordinates.length -1 ]
            }));
            mapView.current.fitToCoordinates(coordinates,{
                animated: true,
                edgePadding:{
                    top: 110,
                    bottom: 40,
                    left:40,
                    right:40
                }
            });
            io.emit("requestTaxi",{latitude,longitude});
        } catch (error) {
            console.error('error prediction press')
        }
    }
    if(!latitude || !longitude){
        return(
            <View style = {container}>
                 <ActivityIndicator size="large" style= {mySpiner}/>
            </View>
        )
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style= {container}>
                <MapView style= {mapStyle} showsUserLocation followsUserLocation 
                        ref ={mapView}
                        region ={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta:0.020
                        }}>
                            {coordinates.length > 0 && (
                                <Polyline
                                    coordinates={coordinates} strokeWidth ={ 5 } strokeColor ="#2dbb54"
                                />
                            )}
                            {destinationCoords && ( <Marker coordinate ={destinationCoords}/>)}
                            {taxiCorrds && (
                            <Marker coordinate = {taxiCorrds}>
                                <Image source = {taxi_logo} style = {taxiStyle}/>
                            </Marker>
                            )}
                </MapView>
                <PlaceInput latitude = {latitude} longitude ={longitude} onPredictionPress ={handlePredictionPress}/>
        </View>
        </TouchableWithoutFeedback>
     
    )
}


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
    taxiStyle:{
        width: 30,
        height: 30
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
export default PassengerScreen