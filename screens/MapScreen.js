import React, { useState, useRef, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const MapScreen = ({ navigation }) => { 
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: -34.608512,
        longitude: -58.372227,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const stateRef = useRef();
    stateRef.current = selectedLocation;

    const savePickedLocationHandler = () => {
        if(!stateRef.current){
            return;
        } else {
            navigation.navigate('Nuevo', { picked: stateRef.current });
        }
    }

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item
                        title="Guardar"
                        iconName="save-outline"
                        onPress={savePickedLocationHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [navigation])

    let markerCoordinates;
    if(selectedLocation){
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
        }
    }

    return (
        <MapView 
            region={region} 
            style={styles.map}
            onLongPress={selectLocationHandler}
        >
            {
                markerCoordinates && <Marker title="Selección" coordinate={markerCoordinates}/>
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;