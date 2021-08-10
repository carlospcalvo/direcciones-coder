import React from 'react'
import { Platform } from 'react-native' 
import { createStackNavigator } from '@react-navigation/stack'

import { COLORS } from '../constants' 

// screens
import PlaceListScreen from '../screens/PlaceListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'


const PlaceStack = createStackNavigator()

const PlaceNavigator = () => (
    <PlaceStack.Navigator
        initialRoute='Direcciones'
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? COLORS.CHARCOAL : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.CHARCOAL,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >
        <PlaceStack.Screen
            name="Direcciones"
            component={PlaceListScreen}
            options={{title: 'Direcciones'}} 
        />
        <PlaceStack.Screen
            name="Detalle"
            component={PlaceDetailScreen}
            options={{title: 'Detalle direccion'}} 
        />
        <PlaceStack.Screen
            name="Nuevo"
            component={NewPlaceScreen}
            options={{title: 'Agregar dirección'}} 
        />
        <PlaceStack.Screen
            name="Map"
            component={MapScreen}
            options={{title: 'Mapa'}} 
        />
    </PlaceStack.Navigator>
)


export default PlaceNavigator