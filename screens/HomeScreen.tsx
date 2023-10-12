import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Animated, Button, Modal, TextInput} from "react-native";
import * as csv from 'react-native-csv'
import FlatList = Animated.FlatList;
import {Station} from "../types/StationType";
import {fetchCsvData} from "../fetchData/CsvDataFetcher";


const HomeScreen: React.FC = () => {

    const [stations, setStations] = useState<Station[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newStation, setNewStation] = useState<Station | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const csvString = await fetchCsvData();
            const jsonArray = csv.readString(csvString as string, {header: true}).data;
            setStations(jsonArray as Station[])
        };
        loadData().then(r => console.log('fetch done'));
    }, []);


    const addNewStation = () => {
        if (newStation) {
            setStations([newStation, ...stations]);
            setIsModalVisible(false);
            setNewStation(null);
        }
    }


    return (

        <View style={styles.container}>

            <Text style={styles.title}>Wiener Linien Stations</Text>

            <Button title="Add Station" onPress={() => setIsModalVisible(true)}/>

            <FlatList
                data={stations}
                renderItem={({item}) => <Text style={styles.listItem}>{item.NAME}</Text>}
                keyExtractor={(item) => item.DIVA}
            />


            <Modal visible={isModalVisible}>
                <View style={styles.modalContent}>
                    <TextInput placeholder="Name" style={styles.textInput}
                               onChangeText={(text) => setNewStation({DIVA: "", GEMEINDE: "", GEMEINDE_ID: "", HALTESTELLEN_ID: "", STAND: "", TYP: "", WGS84_LAT: "", WGS84_LON: "", ...newStation, NAME: text})}/>
                    <TextInput placeholder="Typ" style={styles.textInput}
                               onChangeText={(text) => setNewStation({DIVA: "", GEMEINDE: "", GEMEINDE_ID: "", HALTESTELLEN_ID: "", NAME: "", STAND: "", WGS84_LAT: "", WGS84_LON: "", ...newStation, TYP: text})}/>
                    <TextInput placeholder="Gemeinde" style={styles.textInput}
                               onChangeText={(text) => setNewStation({DIVA: "", GEMEINDE_ID: "", HALTESTELLEN_ID: "", NAME: "", STAND: "", TYP: "", WGS84_LAT: "", WGS84_LON: "", ...newStation, GEMEINDE: text})}/>
                    <Button title="Save" onPress={addNewStation}/>
                    <View style={{height: 20}}/>
                    <Button title="Cancel" onPress={() => setIsModalVisible(false)}/>
                </View>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        textAlign: 'center',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});

export default HomeScreen;