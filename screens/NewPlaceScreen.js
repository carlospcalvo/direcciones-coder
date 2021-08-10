import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants'
import { addPlace } from '../store/places.action';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [error, setError] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const handleInput = text => setTitle(text);
    const handleImage = path => setSelectedImage(path);

    useEffect(() => {
        setSelectedLocation(route.params?.picked);
    }, [route.params])

    const handleSave = () => {
        let error;

        if (title.length < 5 ) {
            error = 'La dirección debe tener al menos 5 caracteres!';
        } else if (selectedImage === '') { 
            error = 'Debe agregar una imagen antes de guardar la dirección!';
        } else if (!selectedLocation) {
            error = 'Debe seleccionar una ubicación antes de guardar la dirección!';
        }

        if(error){
            Alert.alert(
				'No se pudo guardar la dirección', 
				error, 
				[{ text: 'Ok'}]
			);
            return;
        }

        dispatch(addPlace(title, selectedImage, selectedLocation));
        navigation.goBack();
    }

    const locationPickerHandler = useCallback(location => {
        setSelectedLocation(location);
    }, [selectedLocation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Ingresa la nueva dirección: </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={handleInput}    
                    value={title}
                />
                {
                    error && <Text style={styles.error}>{error}</Text>
                }
                <ImageSelector onImage={handleImage}/>
                <LocationPicker 
                    navigation={navigation}
                    onLocationPicked={locationPickerHandler}    
                    location={selectedLocation}
                />
                <Button 
                    title='Guardar dirección' 
                    color={COLORS.PERSIAN_GREEN}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    },
    title: {
        fontSize: 18,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    error: {
        color: 'red',
        fontSize: 10,
        marginTop: 10,
        marginBottom: 10,
    },
})

export default NewPlaceScreen
