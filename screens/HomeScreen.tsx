import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import * as csv from 'react-native-csv'
import {Asset} from "expo-asset";


type Station = {
    HALTESTELLEN_ID: string;
    TYP: string;
    DIVA: string;
    NAME: string;
    GEMEINDE: string;
    GEMEINDE_ID: string;
    WGS84_LAT: string;
    WGS84_LON: string;
    STAND: string;
};

const fetchCsvData = async () => {
    const asset = Asset.fromModule(require('assets/wienerlinien-ogd-haltestellen.csv'));
    await asset.downloadAsync();

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', asset.uri, true);
        xhr.responseType = 'text';

        xhr.onload = () => {
            const text = xhr.responseText;
            resolve(text);
        };

        xhr.onerror = () => {
            reject(xhr.statusText);
        };

        xhr.send();
    });
}

const HomeScreen: React.FC = () => {

    const [stations, setStations] = useState<Station[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newStation, setNewStation] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const csvString = await fetchCsvData();
            const jsonArray = csv.readString(csvString as string, {header: true}).data;
            setStations(jsonArray as Station[])
        };
        loadData().then(r => console.log('done'));
    }, []);

    return (

        <View>
            <Text style={styles.title}>Home</Text>

            {stations.map((item, index) => (
                <Text key={index}>{item.NAME}</Text>
            ))}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
});

export default HomeScreen;