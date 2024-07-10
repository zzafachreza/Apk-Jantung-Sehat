import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { MyHeader } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts } from '../../utils';

export default function NotesPage({ navigation }) {
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();

    const backPage = () => {
        navigation.goBack()
    };


    useEffect(() => {
        const fetchNotes = async () => {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        };
        fetchNotes();
    }, [isFocused]); // Refresh notes when screen is focused

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <MyHeader judul="My Notes"  onPress={backPage}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {notes.map((note, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.noteContainer} 
                            onPress={() => navigation.navigate('ResultNotes', { note })}
                        >
                            <Text style={styles.noteTitle}>{note.title}</Text>
                            <Text style={styles.noteDate}>{note.timestamp}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.addButtonContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('InputNotes')}>
                    <View>
                        <Image style={styles.addButton} source={require('../../assets/plus.png')} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    },
    container: {
        width: '100%',
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2
    },
    noteTitle: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.primary,
    },
    noteDate: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: 'gray',
        marginTop: 5
    },
    addButtonContainer: {
        padding: 10,
        flexDirection: "row",
        marginBottom: 50,
        justifyContent: 'flex-end'
    },
    addButton: {
        width: 73,
        height: 73,
    }
});
