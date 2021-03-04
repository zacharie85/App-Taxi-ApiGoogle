import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import prefix, { API_KEY, BASE_URL } from "../utils/helpers";
import {Ionicons} from "@expo/vector-icons"
const  {width} = Dimensions.get('window');
import axios from "axios";
import  Predictions from "./Predictions";

const initialState ={
    place:"",
    predictions:[],
    loading: false
}
const PlaceInput = ({latitude,longitude,onPredictionPress}) =>{

    const [state, setState] = useState(initialState);
    const {place,loading,predictions} = state
    const {container, icons,input,inputContainer} = styles;

    const handleChangeText = value =>{
        setState(prevState =>({
            ...prevState,
            place:value,
            loading: true
        }));
        const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&location=${latitude},${longitude}&radius=2000`
        //console.log("url,=", url );

        search(url);
    }

    const search = async url =>{
        try {
            const{
                data: {predictions}
            } = await axios.get(url);
            setState(prevState =>({
                ...prevState,
                predictions,
                loading: false
            }))
        } catch (error) {
            console.error("error de url");
        }
    }
    const renderPrediction =()=>{
        return predictions.map(prediction =>{
            const {structured_formatting, id,place_id} = prediction;

            return(
                <Predictions
                main_text = {structured_formatting.main_text}
                secondary_text={structured_formatting.secondary_text}
                key={place_id}
                onPress={() =>{
                    onPredictionPress(place_id)
                    setState(prevState =>({
                        ...prevState,
                        predictions: [],
                        place:structured_formatting.main_text
                    }))
                }}
                />
            )
        })
    }
    return(
        <View style = {container}>
             <View style ={ inputContainer} >
                 <TextInput style= {input}  value={place} onChangeText ={handleChangeText}/>

                 {!loading &&  
                        <Ionicons style ={icons}   name={`${prefix}-search`} />
                 }
                 {loading  && <ActivityIndicator/>}
                
             </View>
             {!loading && predictions.length > 0 ? renderPrediction() : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        shadowColor: "black",
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:"white",
        borderRadius: 10,
        position:"absolute",
        width: width-50,
        top:50,
        backgroundColor:"white",
        paddingHorizontal:10
    },
    icons:{
        fontSize:25,
        color:"#d6d6d6"
    },
    input:{
        fontSize:16,
        color:"#303030",
        maxWidth:"80%",
        minWidth:"30%"
    },
    inputContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,
        
    }   
})


export default PlaceInput