import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../constants/colors';

const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        console.log(event);
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            return;
        }
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler })
    }, [savePickedLocationHandler]);

    let marketCoordinates;

    if (selectedLocation) {
        marketCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    return (
        <MapView styles={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {marketCoordinates && <Marker title='Picked Location' coordinate={marketCoordinates}></Marker>}
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');
    if(readonly)
    {
        return {};
    }
    return {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButton: {
        marginHorizontal: 20,
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : colors.primary,
    }
});

export default MapScreen;