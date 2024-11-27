import React from "react";
import { View, StyleSheet, Text, Image } from 'react-native';
import {getPhotoUrl} from "@/service/places-api";
import { getDistance } from 'geolib';
import {LocationObject} from "expo-location/src/Location.types";

export const PlaceInfo = ({ item }: any) => {
    const { name, rating, user_ratings_total, vicinity, photos, geometry, location } = item;
    const photoUrl = getPhotoUrl(photos);

    const placeLocation = geometry.location;

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text>Address: {vicinity}</Text>
            <Text>Distance: {calculateDistance(placeLocation, location)}</Text>
            <Text>Rating: {rating} ({user_ratings_total} reviews)</Text>
            {photoUrl && (
                <Image
                    source={{ uri: photoUrl }}
                    style={styles.photo}
                />
            )}
        </View>
    );
};

const calculateDistance = (placeLocation: {lat: number, lng: number }, location: LocationObject) => {
    if (!location) {
        return 'Calculating...';
    }

    const distance = getDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: placeLocation.lat, longitude: placeLocation.lng }
    );

    // Convert distance to kilometers or meters
    return distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    photo: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
});