import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { colors, fonts } from '../../utils';
import { MyButton } from '../../components';

export default function WelcomePage({ navigation, route }) {
    const [data, setData] = useState(route.params)

    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (!selectedRole) {
            showMessage({
                message: 'Silakan pilih peran Anda terlebih dahulu.',
                type: 'danger',
                duration: 3000,
                style: { marginTop: 40, justifyContent: 'center', alignItems: 'center' },
                titleStyle: { fontFamily: fonts.primary[600], textAlign: 'center' },
            });
        } else {
            navigation.navigate('JenisPenyakitJantung', {
                ...data,
                tipe: selectedRole
            });
        }
    };

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <View style={styles.container}>
                {step === 1 ? (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 75 }}>
                            <Text style={{ fontFamily: fonts.primary[400], textAlign: 'center', fontSize: 20, color: colors.primary }}>
                                Halo!{'\n'}
                                Selamat Datang di Aplikasi
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 60 }}>
                            <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <MyButton title="Selanjutnya" onPress={handleNext} />
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.headerText}>Apakah Anda?</Text>
                        <View style={styles.rolesContainer}>
                            <TouchableOpacity
                                style={[styles.roleButton, selectedRole === 'Pasien' && styles.selectedRole]}
                                onPress={() => handleRoleSelect('Pasien')}
                            >
                                <Image source={require('../../assets/patient_icon.png')} style={styles.roleIcon} />
                                <Text style={styles.roleText}>Pasien</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.roleButton, selectedRole === 'Pendamping' && styles.selectedRole]}
                                onPress={() => handleRoleSelect('Pendamping')}
                            >
                                <Image source={require('../../assets/companion_icon.png')} style={styles.roleIcon} />
                                <Text style={styles.roleText}>Pendamping Pasien</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <MyButton title="Selanjutnya" onPress={handleNext} />
                        </View>
                    </>
                )}
            </View>
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
        flex: 1,
    },
    logo: {
        width: 300,
        height: 300,
    },
    headerText: {
        fontFamily: fonts.primary[600],
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 30,
    },
    rolesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 50,
    },
    roleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
    },
    selectedRole: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    roleIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    roleText: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        color: colors.primary,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
    },
});
