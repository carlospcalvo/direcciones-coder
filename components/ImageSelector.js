import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { COLORS } from '../constants';

const ImageSelector = props => {
	const [pickedUri, setPickedUri] = useState();

	const verifyPermissions = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		
		if(status !== 'granted'){
			Alert.alert(
				'Permisos insuficientes', 
				'Necesita dar permisos de uso de la cámara para usar esta app', 
				[{ text: 'Ok'}]
			);
			return false;
		}

		return true;
	}

	const handleTakeImage = async () => {
		const isCameraOk = await verifyPermissions();

		if(!isCameraOk) return;

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 1,
		});

		setPickedUri(image.uri);
		props.onImage(image.uri);
	}

	return (
		<View style={styles.container}>
			<View style={styles.preview}>
				{
					!pickedUri
					? <Text>No has seleccionado ninguna imagen...</Text>
					: <Image style={styles.image} source={{ uri: pickedUri }}/>
				}
			</View>
			<Button
				title="Tomar foto"
				color={COLORS.CHARCOAL}
				
				onPress={handleTakeImage}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginVertical: 10
	},
	preview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.YELLOW_CRAYOLA,
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	}
});

export default ImageSelector;