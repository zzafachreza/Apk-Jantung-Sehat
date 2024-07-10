import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { colors, fonts } from '../../utils';
import { MyButton } from '../../components';

export default function GenderSelect({ navigation }) {
    const [selectedGender, setSelectedGender] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleSave = () => {
        if (!selectedGender) {
            showMessage({
                message: 'Silakan pilih jenis kelamin Anda terlebih dahulu.',
                type: 'danger',
                duration: 3000,
                style: { marginTop: 40, justifyContent: 'center', alignItems: 'center' },
                titleStyle: { fontFamily: fonts.primary[600], textAlign: 'center' },
            });
            return;
        }
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('Home');
    };

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Apa Jenis Kelamin Anda?</Text>
                    <View style={{ flexDirection: "row", marginTop: 150 }}>
                        <View style={styles.gendersContainer}>
                            <TouchableOpacity
                                style={[styles.genderButton, selectedGender === 'Laki-laki' && styles.selectedGender]}
                                onPress={() => handleGenderSelect('Laki-laki')}
                            >
                                <Image source={require('../../assets/male_icon.png')} style={styles.genderIcon} />
                                <Text style={styles.genderText}>Laki-laki</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderButton, selectedGender === 'Perempuan' && styles.selectedGender]}
                                onPress={() => handleGenderSelect('Perempuan')}
                            >
                                <Image source={require('../../assets/female_icon.png')} style={styles.genderIcon} />
                                <Text style={styles.genderText}>Perempuan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <MyButton title="Simpan" onPress={handleSave} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={require('../../assets/done.png')} style={styles.modalImage} />
                        <Text style={styles.modalText}>Berhasil membuat akun!</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
    },
    headerText: {
        fontFamily: fonts.primary[600],
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 30,
    },
    gendersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 50,
    },
    genderButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
    },
    selectedGender: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    genderIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    genderText: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        color: colors.primary,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
        position: 'absolute',
        bottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: fonts.primary[600],
        fontSize: 18,
    },
    modalButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
    },
    modalButtonText: {
        color: 'white',
        fontFamily: fonts.primary[600],
        fontSize: 16,
    },
});
