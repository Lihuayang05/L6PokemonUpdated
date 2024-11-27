import React, { useState } from 'react';
import { datasource } from "./Data.js";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [Name, setName] = useState('');
    const [Id, setId] = useState('');
    const [type, setType] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    value={Name}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Card ID:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setId(text)}
                    value={Id}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Type:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: "Water", value: "Water" },
                        { label: "Fire", value: "Fire" },
                        { label: "Grass", value: "Grass" },
                        { label: "Electric", value: "Electric" },
                        { label: "Poison", value: "Poison" }
                    ]}
                />
            </View>

            <Button
                title="SUBMIT"
                onPress={() => {
                    let item = { Name, CardImage: Id }; // Using Name and CardImage as properties
                    let indexNum = 0;
                    // Set index based on selected type
                    if (type === 'Fire') {
                        indexNum = 1;
                    } else if (type === 'Grass') {
                        indexNum = 2;
                    } else if (type === 'Electric') {
                        indexNum = 3;
                    } else if (type === 'Poison') {
                        indexNum = 4;
                    }
                    // Add item to the appropriate section in datasource
                    datasource[indexNum].data.push(item);
                    navigation.navigate('Home');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Add;
