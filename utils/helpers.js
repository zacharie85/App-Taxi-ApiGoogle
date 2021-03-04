import {Platform} from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const prefix = Platform.OS === "ios" ? "ios" : "md";
import PolyLine from '@mapbox/polyline';

export const config = {
    iosClientId: `322855492540-ufii807une21q2mc6kup3opovjlu4hbv.apps.googleusercontent.com`,
  androidClientId: `322855492540-8flfscc4vqcik6gifc7p7kb6823ofbe5.apps.googleusercontent.com`,
  iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
  androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
}

// authentification
export const auth = async () =>{

    try {
        const {user, type} = await Google.logInAsync(config);
       // console.log('result', result);
       if(type === "success"){

        // stocker l'utilisateur dans la BD

        // Stocker dans la memoire interne
        const {name, photoUrl , email} =  user;

        await AsyncStorage.setItem('user', JSON.stringify({
            name,
            photoUrl,
            email
        }))
            console.log("Naviguer vers home");
       }

    } catch (e) {
        console.error("error auth", e);
    }
}
export const API_KEY = "AIzaSyBiMDKSPEfuOkucCCeAXrfFmfK_LlsJ1QM";
export const BASE_URL = "https://maps.googleapis.com/maps/api";

// ecran d'initialisation
export const renderInitialScreen = async () =>{
    try {
        const user = await AsyncStorage.getItem("user");
        JSON.parse(user);
        return user ? "Home" : "Login";
    } catch (error) {
        console.error("error",error);
    }
}

// recuperation de la route
export const getRoute = async url =>{
    try {
        const {data: {routes}  } = await axios.get(url);
        const points = routes[0].overview_polyline.points;
        return points;
    } catch (error) {
        console.error("error route")
    }
}

// decodage de la route 
export const decodePoint = point =>{
    const fixPoints = PolyLine.decode(point);
    //console.log('fixPoint', fixPoint);
// Tranforme les points en Object
    const route = fixPoints.map(fixPoint => {
        return{
            latitude: fixPoint[0],
            longitude: fixPoint[1]
        } 
    })
    console.log("route",route);
    return route;
}

export const SERVER_URL = "http://192.168.0.155:4000";