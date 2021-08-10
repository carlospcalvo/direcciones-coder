import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Button } from 'react-native';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';
import { COLORS } from '../constants';

const LocationPicker = ({ navigation, onLocationPicked, location }) => {
	const [loading, setLoading] = useState(false);
	const [pickedLocation, setPickedLocation] = useState();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if(status !== 'granted'){
				Alert.alert(
					'Permisos insuficientes',
					'Necesita otorgar permisos de ubicación a la app',
					[{ text: 'Ok' }]
				);
				return;
			}
		})();
	}, []);

	useEffect(() => {
		setPickedLocation(location);
	}, [location])

	const getLocationHandler = async () => {
		try {
			setLoading(true);
			let current_location = await Location.getCurrentPositionAsync({ timeout: 5000 });
			let data = {
				lat: current_location.coords.latitude,
				lng: current_location.coords.longitude
			}
			setPickedLocation(data);
			onLocationPicked(data);
		} catch (error) {
			Alert.alert(
				'No se pudo obtener la ubicación',
				'Por favor intente nuevamente',
				[{ text: 'Ok' }]
			);
		} finally {
			setLoading(false);
		}
	}

	const handlePickOnMap = () => navigation.push('Map');

	return (
		<View style={styles.locationPicker}>
			<MapPreview style={styles.mapPreview} location={pickedLocation}>
				{
					loading 
					? <ActivityIndicator size="large" color={COLORS.CHARCOAL} />
					: <Text>Selecciona una ubicación...</Text>
				}
			</MapPreview>
			<View style={styles.buttonContainer}>
				<Button
					title="Usar mi ubicación"
					color={COLORS.CHARCOAL}
					onPress={getLocationHandler}
				/>
				<Button 
					title="Marcar en el mapa"
					color={COLORS.CHARCOAL}
					onPress={handlePickOnMap}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15,
	},
	mapPreview: {
		height: 150,
		width: '100%',
		marginBottom: 10,
		borderWidth: 1,
		borderColor: COLORS.YELLOW_CRAYOLA,
		/* justifyContent: 'center',
		alignItems: 'center', */
	},	
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

export default LocationPicker;