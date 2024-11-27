import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { datasource } from './Data.js';

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        const imageLink = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.CardImage}-2x.png`;

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                    navigation.navigate('Edit', {
                        index: index,
                        type: section.title,
                        key: item.Name,
                    })
                }
            >
                <Text style={styles.textStyle}>{item.Name}</Text>
                <Image
                    source={{ uri: imageLink }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title, bgColor, icon } }) => (
        <View style={[styles.headerContainer, { backgroundColor: bgColor }]}>
            <Icon name={icon} size={30} color="white" style={styles.headerIcon} />
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pokemon TCG</Text>
            </View>

            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => navigation.navigate('Add')}
            >
                <Text style={styles.addButtonText}>Add New Pokemon</Text>
            </TouchableOpacity>

            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.Name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf3c4',
        padding: 15,
    },
    header: {
        backgroundColor: '#ff3918',
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '900',
        color: 'white',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize',
        flex: 1,
    },
    headerIcon: {
        marginRight: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 18,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        flex: 1,
        marginRight: 10,
        textAlign: 'left',
    },
    cardImage: {
        width: 180,
        height: 280,
        marginLeft: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    addButtonContainer: {
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: '#ffd600',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#fff',
    },
});

export default Home;
