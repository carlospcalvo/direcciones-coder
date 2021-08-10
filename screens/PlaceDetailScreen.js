import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapPreview from '../components/MapPreview';
import { COLORS } from '../constants';

const PlaceDetailScreen = ({ route }) => {
    const { title, image, address, lat, lng } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image} source={{ uri: image}}/>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.mapContainer}>
                <MapPreview style={styles.mapPreview} location={{lat, lng}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    title: {
        fontSize: 20,
        marginVertical: 15, 
        textAlign: 'center'
    },  
    address: {
        fontSize: 15,
        marginVertical: 15, 
        textAlign: 'center'
    },
    image: {
		height: 200,
		marginBottom: 10,
        marginHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.YELLOW_CRAYOLA,
		borderWidth: 1,
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPreview: {
        height: 190,
		width: '90%',
		marginBottom: 10,
    }
});

export default PlaceDetailScreen;
