import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultNote({ route, navigation }) {
    const { note } = route.params;

    const backPage = () => {
        navigation.goBack()
    };


    const deleteNote = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes) {
                const notes = JSON.parse(savedNotes);
                const updatedNotes = notes.filter(n => n.title !== note.title || n.timestamp !== note.timestamp);
                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
                Alert.alert('Success', 'Note deleted successfully!', [
                    { text: "OK", onPress: () => navigation.navigate('Notes') }
                ]);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to delete the note.');
        }
    };

    const shareNote = () => {
        // Logic to share the note
        Alert.alert('Share', 'Share functionality is not implemented yet.');
    };

    const editNote = () => {
        navigation.navigate('InputNote', { note });
    };

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <MyHeader judul="My Notes" onPress={backPage}/>
            <View style={styles.container}>
                <Text style={styles.label}>Judul :</Text>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.label}>Isi :</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={editNote}>
                    <Image style={styles.icon} source={require('../../assets/edit.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteNote}>
                    <Image style={styles.icondelete} source={require('../../assets/delete.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={shareNote}>
                    <Image style={styles.icon} source={require('../../assets/share.png')} />
                </TouchableOpacity>
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
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.primary,
        marginBottom: 10
    },
    noteTitle: {
        fontSize: 18,
        fontFamily: fonts.primary[400],
        marginBottom: 20
    },
    noteContent: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: '#000',
        textAlign: 'justify'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginBottom: 20
    },
    icon: {
        width: 17,
        height: 17,
    },
    icondelete: {
        width: 17,
        height: 19,
    },
});
