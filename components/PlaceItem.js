import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const PlaceItem = props => {

	return (
		<TouchableOpacity 
			onPress={props.onSelect}
			style={styles.placeItem}
			onLongPress={() => props.onLongPress(props.id)}
		> 
			<Image style={styles.image} source={{ uri: props.image }} />
			<View style={styles.info}>
				<Text style={styles.title}>{props.title}</Text>
				<Text numberOfLines={2} style={styles.address}>{props.address}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	placeItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 16,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: COLORS.BURNT_SIENNA,
	},
	info: {
		marginLeft: 25,
		width: 250,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	title: {
		color: COLORS.CHARCOAL,
		fontSize: 18,
		marginBottom: 6,
	},
	address: {
		color: 'lightgrey',
		fontSize: 16,
		width: '90%'		
	},
})

export default PlaceItem