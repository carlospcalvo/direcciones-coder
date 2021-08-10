import Place from "../models/Place";
import { ADD_PLACE, DELETE_PLACE, LOAD_PLACES } from "./places.action";

const initialState = {
    places: []
}

export default ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id.toString(), 
                action.payload.title, 
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.lng
            );
            
            return {
                ...state,
                places: state.places.concat(newPlace)
            };
        case LOAD_PLACES: 
            return {
                ...state,
                places: action.places.map(item => new Place(
                    item.id.toString(),
                    item.title,
                    item.image,
                    item.address,
                    item.lat,
                    item.lng
                ))
            }
        case DELETE_PLACE: 
            return {
                ...state,
                places: state.places.filter(item => item.id !== action.id)
            }
        default:
            return state;
    }
}