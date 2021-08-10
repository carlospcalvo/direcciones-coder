import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { insertAddress, getAddresses, deleteAddress } from '../db';
import { MAP } from '../constants';

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACES = 'LOAD_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = ( title, image, location ) => {
    return async dispatch => {
        const filename = image.split('/').pop();
        const path = FileSystem.documentDirectory + filename;

        try {
            const geocoding_api_response = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`);
            
            if(geocoding_api_response.status < 200 || geocoding_api_response.status >= 400) throw new Error('[AddPlace] Hubo un error con Google Geocoding');
            if(!geocoding_api_response.data) throw new Error('[AddPlace] Google no encontró la dirección');
            
            const address = geocoding_api_response.data.results[0].formatted_address;

            FileSystem.moveAsync({
                from: image,
                to: path
            });

            const sqllite_transaction_result = await insertAddress(title, path, address, location.lat, location.lng);
            
            dispatch({ 
                type: ADD_PLACE, 
                payload: { 
                    id: sqllite_transaction_result.insertId, 
                    title, 
                    image: path,
                    address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    },
                } 
            });
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await getAddresses();
            dispatch({ type: LOAD_PLACES, places: result.rows._array });
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export const removePlace = id => {
    return async dispatch => {
        try {
            const result = await deleteAddress(id);
            if(result.rowsAffected === 1){
                dispatch({ type: DELETE_PLACE, id })
            } else {
                throw new Error('[RemovePlace] No se pudo eliminar la dirección');
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}