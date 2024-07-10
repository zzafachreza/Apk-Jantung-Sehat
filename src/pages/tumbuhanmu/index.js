import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MyHeader } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

const playIcon = require('../../assets/playaudio.png');
const pauseIcon = require('../../assets/pause.png');
const saveIcon = require('../../assets/save.png'); // Assuming you have a save icon
const shareIcon = require('../../assets/share.png'); // Assuming you have a share icon

export default function Tumbuhanmu({ navigation }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [audioName, setAudioName] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSaveShare, setShowSaveShare] = useState(false);

    const backPage = () => {
        navigation.goBack()
    };



    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            console.log('Image Picker Response: ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.uri) {
                const source = response.uri;
                console.log('Selected Image URI:', source); // Log URI to check if it is valid
                setSelectedImage(source);
            } else {
                console.log('No valid URI in response');
            }
        });
    };

    const pickAudio = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            console.log('Audio Picker Response: ', res);
            setAudioName(res[0].name);

            // Convert content URI to file path
            const uri = res[0].uri;
            const destPath = `${RNFS.DocumentDirectoryPath}/${res[0].name}`;
            await RNFS.copyFile(uri, destPath);

            const sound = new Sound(destPath, '', (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }
                setSound(sound);
                setSelectedAudio(destPath);
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled audio picker');
            } else {
                console.log('AudioPicker Error: ', err);
            }
        }
    };

    const playAudio = () => {
        if (sound) {
            sound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                    setIsPlaying(false);
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (sound) {
            sound.pause(() => {
                console.log('Paused');
            });
            setIsPlaying(false);
        }
    };

    const handleOk = () => {
        setShowSaveShare(true);
    };

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <MyHeader judul="Desain Tumbuhanmu" onPress={backPage} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.uploadContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} resizeMode="contain" />
                        ) : (
                            <Image source={require('../../assets/iconuploadgambar.png')} style={styles.uploadIcon} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.uploadText}>*Ukuran maksimal 5 MB</Text>
                </View>
                {selectedImage && (
                    <View style={styles.audioContainer}>
                        {!selectedAudio && (
                            <TouchableOpacity onPress={pickAudio} style={styles.audioButton}>
                                <Image source={require('../../assets/uploadaudio.png')} style={styles.audioIcon} />
                            </TouchableOpacity>
                        )}
                        {selectedAudio && (
                            <View style={styles.audioControlContainer}>
                                {showSaveShare ? (
                                    <>
                                        <TouchableOpacity style={styles.saveButton}>
                                            <Image source={saveIcon} style={styles.saveIcon} />
                                            <Text style={styles.saveText}>Simpan</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.shareButton}>
                                            <Image source={shareIcon} style={styles.shareIcon} />
                                            <Text style={styles.shareText}>Bagikan</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio} style={styles.playButton}>
                                            <Image source={isPlaying ? pauseIcon : playIcon} style={styles.playIcon} />
                                        </TouchableOpacity>
                                        <Text style={styles.audioText}>{audioName}</Text>
                                        <TouchableOpacity onPress={handleOk} style={styles.okButton}>
                                            <Text style={styles.okText}>Ok</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#f5f5f5',
        marginBottom: 20
    },
    uploadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        position: 'relative'
    },
    uploadIcon: {
        width: 100,
        height: 100,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    uploadText: {
        color: '#888',
        fontSize: 12,
        marginTop: 10
    },
    audioContainer: {
        alignItems: 'center'
    },
    audioButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioIcon: {
        width: 197,
        height: 48,
    },
    audioControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    playButton: {
        marginRight: 10
    },
    playIcon: {
        width: 30,
        height: 30
    },
    audioText: {
        color: '#888',
        fontSize: 12,
        flex: 1,
        textAlign: 'center'
    },
    okButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    okText: {
        color: '#fff',
        fontSize: 12
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    saveIcon: {
        width: 30,
        height: 30
    },
    saveText: {
        color: '#007bff',
        fontSize: 12,
        marginLeft: 5
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shareIcon: {
        width: 30,
        height: 30
    },
    shareText: {
        color: '#007bff',
        fontSize: 12,
        marginLeft: 5
    }
});
