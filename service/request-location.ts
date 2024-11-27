import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
    try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.warn('Location permission denied');
        }
        return status;
    } catch (err) {
        console.error(err);
    }
};