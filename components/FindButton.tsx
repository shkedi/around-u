import {View, TouchableOpacity, Text, Alert} from 'react-native';

import React, {FC, useEffect} from "react";

import {Svg, Circle,} from "react-native-svg";
import Animated, {
    runOnJS,
    useAnimatedProps, useAnimatedStyle,
    useSharedValue, withRepeat,
    withTiming,
} from "react-native-reanimated";
import {fetchNearbyPlaces} from "@/service/places-api";
import * as Location from "expo-location";
import {Accuracy} from "expo-location";
import {LocationObject} from "expo-location/src/Location.types";

const Circle_Length = 500;
const Radius = Circle_Length / (2 * Math.PI);

export interface FindButtonProps {
    distance: string;
    section: string;
    setPlaces: React.Dispatch<React.SetStateAction<any>>;
    setLocation: React.Dispatch<React.SetStateAction<LocationObject | undefined>>;
    setPageToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const FindButton: FC<FindButtonProps> = ({distance, section, setPlaces, setLocation, setPageToken}) => {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const progressCircle = useSharedValue(1);
    const shakeAnim = useSharedValue(0);

    const [loading, setLoading] = React.useState(false);

    const animatedProps= useAnimatedProps(() => ({
        strokeDashoffset: 1000 * progressCircle.value,
    }))

    const shakeStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withRepeat(
                        withTiming(shakeAnim.value, { duration: 50 }),
                        30,
                        true
                    ),
                },
            ],
        };
    });

    useEffect(() => {
        progressCircle.value = withTiming(0, { duration: 2000 }, (isFinished) => {
            if (isFinished) {
                runOnJS(setLoading)(false);
                shakeAnim.value = 0;
            }
        })
    }, [progressCircle, loading])

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity
                onPress={async () => {
                    if (!distance?.length || !section?.length) {
                        Alert.alert('Error', 'Please fill in all fields');
                        return;
                    }
                    progressCircle.value = 1;
                    setLoading(true)
                    const locationObject = await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced})
                    setLocation(locationObject);
                    const nearByPlaces = await fetchNearbyPlaces(distance, locationObject, section, null);
                    setPlaces(nearByPlaces.results);
                    setPageToken(nearByPlaces.next_page_token);
                    shakeAnim.value = 10;
                }}
                disabled={loading}
            >
                <Svg height={250} width={350}>
                    <Circle
                        cx={175}
                        cy={120}
                        r={Radius}
                        stroke="#404258"
                        fill="#fff"
                        strokeWidth={25}
                    />
                    <AnimatedCircle
                        cx={175}
                        cy={120}
                        r={Radius}
                        stroke="#82CD47"
                        strokeWidth={15}
                        fill="transparent"
                        strokeDasharray={20}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                    />
                </Svg>

                <Animated.View
                    style={[
                        {
                        position: 'absolute',
                        top: '43%',
                        left: '46%',
                    },
                        shakeStyle
                ]}
                >
                    <Text style={{ color: '#82CD47', fontSize: 24, fontWeight: 'bold',
                    }}>
                        Find
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};