import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {Station} from "../types/StationType";
import {fetchCsvData} from "../fetchData/CsvDataFetcher";
import * as csv from 'react-native-csv'


const MapScreen: React.FC = () => {

    const [stations, setStations] = useState<Station[]>([]);
    const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 48.2082,
        longitude: 16.3738,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        const loadData = async () => {
            const csvString = await fetchCsvData();
            const jsonArray = csv.readString(csvString as string, {header: true}).data;


            const validStations = (jsonArray as Station[]).filter(station =>
                !isNaN(Number(station.WGS84_LAT)) && !isNaN(Number(station.WGS84_LON))
            );

            setStations(validStations as Station[])
        };

        loadData().then(r => console.log('fetch done'));

        getLocation().then(r => console.log('location done'));

    }, []);

    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (!isNaN(location.coords.latitude) && !isNaN(location.coords.longitude)) {
            setLocation({
                ...location.coords,
                accuracy: location.coords.accuracy || 0
            });
            console.log("Standortdaten erhalten:", location);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else {
            console.log("Ungültige Standortdaten erhalten:", location);
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 48.2082,
                    longitude: 16.3738,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {stations.map(station => (
                    <Marker
                        key={station.HALTESTELLEN_ID}
                        coordinate={{
                            latitude: Number(station.WGS84_LAT),
                            longitude: Number(station.WGS84_LON)
                        }}
                        title={station.NAME}
                    />
                ))}

                {location && !isNaN(location.latitude) && !isNaN(location.longitude) && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        pinColor={"blue"}
                        title="My Location"
                    />
                )}

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },

});

export default MapScreen;