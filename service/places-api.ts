import {LocationObject} from "expo-location/src/Location.types";
import Constants from 'expo-constants';
import {BackHandler} from "react-native";
const apiKey = '<api-key>';
export const fetchNearbyPlaces = async (distance: string, location: LocationObject | undefined, section: string, pageToken: string | null | undefined) => {
    const locationStr = `${location?.coords.latitude},${location?.coords.longitude}`
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationStr}&radius=${distance}${section !== 'all' ? `&type=${section}` : ''}${!!pageToken ? `&pagetoken=${pageToken}`:''}&key=${apiKey}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.results.forEach((res: any) => res['location'] = location)
        return data;
    } catch (error) {
        console.error('Error fetching places:', error);
        return []
    }
};

export const getPhotoUrl = (photos: [{photo_reference:string}]) => {
    const photoReference = photos && photos.length > 0 ? photos[0].photo_reference : null;
    return photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
        : null;
};