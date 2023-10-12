import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import packageInfo from "../package.json";

const AboutScreen: React.FC = () => {

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.title}>About This App</Text>

            <Image source={require('../assets/profile_picture.png')} style={styles.profileImage}/>

            <Text style={styles.subtitle}>Developer Information</Text>

            <Text style={styles.text}>
                Name: Mustafa Rahimi{'\n'}
                Email: if21b093@technikum-wien.at{'\n'}
                Mobile: +43 xxxxxxxx{'\n'}
            </Text>


            <Text style={styles.text}>App Version: {packageInfo.version}</Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 16,
    },
});


export default AboutScreen;