import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";

const ProfileScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
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
    }

});


export default ProfileScreen;