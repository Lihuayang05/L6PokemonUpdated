import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, StyleSheet, Alert } from 'react-native';
import { datasource as originalDatasource } from './Data'; // Static import of original data
import { Picker } from '@react-native-picker/picker';

const Edit = ({ navigation, route }) => {
    const { index, type, key } = route.params;

    const [Name, setName] = useState(key);
    const [CardImage, setCardImage] = useState('');
    const [Type, setType] = useState(type);
    const [datasource, setDatasource] = useState(originalDatasource); // Local state for datasource

    // Set the card image dynamically based on the selected Pokémon
    useEffect(() => {
        const selectedPokemon = datasource.find((category) => category.title === type)
            ?.data[index];
        if (selectedPokemon) {
            setCardImage(selectedPokemon.CardImage);
        }
    }, [index, type, datasource]);

    const handleSave = () => {
        const categoryIndex = datasource.findIndex((category) => category.title === Type);
        if (categoryIndex === -1) {
            Alert.alert('Invalid Type', 'This type does not exist in the list.');
            return;
        }

        // Create a new data array with the updated values to avoid direct mutation
        const updatedData = [...datasource[categoryIndex].data]; // Copy existing data
        updatedData[index] = { ...updatedData[index], Name, CardImage }; // Update the specific item

        // Update the datasource in the local state
        const updatedDatasource = [...datasource]; // Make a copy of the entire datasource
        updatedDatasource[categoryIndex].data = updatedData; // Update the category with the new data

        setDatasource(updatedDatasource); // Update the state to trigger re-render

        navigation.navigate('Home');
    };

    const handleDelete = () => {
        const categoryIndex = datasource.findIndex((category) => category.title === Type);
        if (categoryIndex === -1) {
            Alert.alert('Invalid Type', 'This type does not exist in the list.');
            return;
        }

        Alert.alert('Are you sure?', '', [
            {
                text: 'Yes',
                onPress: () => {
                    // Create a new data array with the Pokémon removed
                    const updatedData = [...datasource[categoryIndex].data];
                    updatedData.splice(index, 1); // Remove the Pokémon

                    // Update the datasource with the new data
                    const updatedDatasource = [...datasource]; // Make a copy of the entire datasource
                    updatedDatasource[categoryIndex].data = updatedData;

                    setDatasource(updatedDatasource); // Update the state to trigger re-render

                    navigation.navigate('Home');
                },
            },
            { text: 'No' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={Name}
                maxLength={20}
                style={styles.input}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Card Image (URL):</Text>
            <TextInput
                value={CardImage}
                style={styles.input}
                onChangeText={(text) => setCardImage(text)}
                placeholder="Enter image URL"
            />

            <Text style={styles.label}>Type:</Text>
            {/* Picker for selecting type */}
            <Picker
                selectedValue={Type}
                style={styles.input}
                onValueChange={(itemValue) => setType(itemValue)}
            >
                {datasource.map((category) => (
                    <Picker.Item key={category.title} label={category.title} value={category.title} />
                ))}
            </Picker>

            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Delete" onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default Edit;
