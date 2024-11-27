import {
    Image,
    StyleSheet,
    Alert, BackHandler, View, FlatList, ActivityIndicator, Text,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {FindButton} from '@/components/FindButton';
import React, {useState} from 'react';
import {FindProperties} from "@/components/FindProperties";
import {requestLocationPermission} from "@/service/request-location";
import {PlaceInfo} from "@/components/PlaceInfo";
import {LocationObject} from "expo-location/src/Location.types";
import {fetchNearbyPlaces} from "@/service/places-api";
export default function HomeScreen() {
    const [distance, setDistance] = useState<string>('');
    const [section, setSection] = useState<string>('');
    const [places, setPlaces] = useState<any[]>([]);
    const [pageToken, setPageToken] = useState<string>();
    const [locationPermission, setLocationPermission] = useState<string | undefined>(undefined)
    const [location, setLocation] = useState<LocationObject>();

    const [loading, setLoading] = useState(false);

    requestLocationPermission()
        .then(per => {
            !!per && setLocationPermission(per)
            return per;
        })
        .then((per) => {
            if (!!per && per !== 'granted') {
                Alert.alert(
                    "Permission Denied",
                    "Unfortunately, this app cannot function without this permission. Please enable it from the app settings.",
                    [{text: "Close App", onPress: () => BackHandler.exitApp()}])
            }
        })

    const reset = () => {
        setPlaces([]);
        setLoading(false);
        setLocation(undefined);
        setDistance('');
        setSection('');
        setPageToken(undefined);
    }

    const loadMorePlaces = () => {
        if (!pageToken || loading) {
            return;
        }
        setLoading(true);
        fetchNearbyPlaces(distance, location, section, pageToken)
            .then(data => {
                setPlaces((prevPlaces) => [...prevPlaces, ...data.results]);
                setPageToken(data.next_page_token);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const LoadMore = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={places}
                    keyExtractor={(item: any) => item.place_id}
                    scrollEnabled={false}
                    renderItem={PlaceInfo}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff"/> : null}
                />
            </View>
        );
    }
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#C9f9D3', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/aroundu-high-resolution-logo-transparent.png')}
                    style={styles.logo}
                />
            }
            loadMoreData={loadMorePlaces}
            isLoadingMore={loading}
            places={places}
            onReset={reset}
        >
            {!places.length && <FindProperties setDistance={setDistance} setSection={setSection}/>}
            {!places.length &&
                <FindButton distance={distance} section={section} setPlaces={setPlaces} setLocation={setLocation}
                            setPageToken={setPageToken}/>}
            {!!places.length && <LoadMore/>}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    logo: {
        height: 178,
        width: 290,
        bottom: 20,
        left: 30,
        position: 'absolute',
    },
});