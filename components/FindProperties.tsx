import React, {FC} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export interface FindPropertiesProps {
    setDistance: React.Dispatch<React.SetStateAction<string>>;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

export const FindProperties: FC<FindPropertiesProps> = ({ setDistance, setSection }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Distance</Text>
                <View style={styles.dropdownContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setDistance(value)}
                        items={[
                            { label: '1 km', value: '1000' },
                            { label: '3 km', value: '3000' },
                            { label: '5 km', value: '5000' },
                            { label: '8 km', value: '8000' },
                            { label: '10 km', value: '10000' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{
                            label: 'Select distance...',
                            value: null,
                            color: '#9EA0A4',
                        }}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Section</Text>
                <View style={styles.dropdownContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSection(value)}
                        items={[
                            { label: 'All', value: 'all' },
                            { label: 'Bakery', value: 'bakery' },
                            { label: 'Bar', value: 'bar' },
                            { label: 'Book Store', value: 'book_store' },
                            { label: 'Bus Station', value: 'bus_station' },
                            { label: 'Cafe', value: 'cafe' },
                            { label: 'Casino', value: 'casino' },
                            { label: 'Drugstore', value: 'drugstore' },
                            { label: 'Gym', value: 'gym' },
                            { label: 'Restaurant', value: 'restaurant' },
                            { label: 'Shopping Mall', value: 'shopping_mall' },
                            { label: 'Spa', value: 'spa' },
                            { label: 'Subway station', value: 'subway_station' },
                            { label: 'Supermarket', value: 'supermarket' },
                            { label: 'Synagogue', value: 'synagogue' },
                            { label: 'Taxi Stand', value: 'taxi_stand' },
                            { label: 'Tourist Attraction', value: 'tourist_attraction' },
                            { label: 'Train Station', value: 'train_station' },
                            { label: 'Transit Station', value: 'transit_station' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{
                            label: 'Select section...',
                            value: null,
                            color: '#9EA0A4',
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#404258',
        width: 80,
        marginRight: 5,
    },
    dropdownContainer: {
        flex: 1,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#82CD47',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white',
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#82CD47',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white',
    },
});