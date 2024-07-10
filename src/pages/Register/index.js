import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyButton } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import SweetAlert from 'react-native-sweet-alert';

export default function Register({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [data, setData] = useState({
        api_token: api_token,
        namalengkap: '',
        email: '',
        nomortelepon: '',
        password: '',
        repassword: '',
    });
    const [modalVisible, setModalVisible] = useState(false);

    const simpan = () => {
        if (!termsAccepted) {
            showMessage({
                message: 'Anda harus menyetujui syarat dan ketentuan penggunaan aplikasi dan kebijakan privasi.',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
            return;
        }

        if (
            data.namalengkap.length === 0 ||
            data.nomortelepon.length === 0 ||
            data.password.length === 0 ||
            data.repassword.length === 0
        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong!',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
        } else if (data.namalengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap ibu',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
        } else if (data.nomortelepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
        } else if (data.password !== data.repassword) {
            showMessage({
                message: 'Kata sandi dan konfirmasi kata sandi tidak cocok',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                style: {
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleStyle: {
                    fontFamily: fonts.primary[600],
                    textAlign: 'center'
                },
            });
        } else {
            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        });
                    } else {
                        setModalVisible(true);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    showMessage({
                        message: 'Terjadi kesalahan, silakan coba lagi',
                        type: 'danger',
                        icon: 'danger',
                        duration: 3000,
                        style: {
                            marginTop: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        titleStyle: {
                            fontFamily: fonts.primary[600],
                            textAlign: 'center'
                        },
                    });
                });
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('Welcome');
    };

    return (
        <ImageBackground 
            source={require('../../assets/bgsplash.png')}
            style={styles.background}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Daftar</Text>
                    <MyInput 
                        placeholder="Nama Lengkap" 
                        value={data.namalengkap} 
                        onChangeText={(val) => setData({ ...data, namalengkap: val })} 
                    />
                    <MyInput 
                        placeholder="Email" 
                        value={data.email} 
                        onChangeText={(val) => setData({ ...data, email: val })} 
                    />
                    <MyInput 
                        placeholder="Nomor Telepon" 
                        keyboardType="numeric" 
                        value={data.nomortelepon} 
                        onChangeText={(val) => setData({ ...data, nomortelepon: val })} 
                    />
                    <MyInput 
                        placeholder="Kata Sandi" 
                        secureTextEntry={true} 
                        value={data.password} 
                        onChangeText={(val) => setData({ ...data, password: val })} 
                    />
                    <MyInput 
                        placeholder="Konfirmasi Kata Sandi" 
                        secureTextEntry={true} 
                        value={data.repassword} 
                        onChangeText={(val) => setData({ ...data, repassword: val })} 
                    />
                    <View style={styles.termsContainer}>
                        <CheckBox
                            value={termsAccepted}
                            onValueChange={setTermsAccepted}
                        />
                        <Text style={styles.termsText}>
                            Setuju dengan Syarat dan Ketentuan Penggunaan aplikasi dan Kebijakan Privasi
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ padding: 10 }}>
                <MyButton 
                    title="Simpan" 
                    onPress={simpan} 
                    disabled={loading} 
                    loading={loading} 
                />
            </View>
            <View style={{ padding: 20 }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
                    <View>
                        <Text style={{ fontFamily: fonts.primary[400], textAlign: 'center' }}>
                            Belum memiliki akun? 
                            <Text style={{ color: colors.primary, fontFamily: fonts.primary[600] }}>
                                Masuk
                            </Text>
                        </Text>
                    </View>
                </TouchableNativeFeedback>
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
                        <MyButton title="OK" onPress={handleModalClose} />
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
    formContainer: {
        padding: 10,
        marginTop: 58,
    },
    headerText: {
        fontFamily: fonts.primary[600],
        fontSize: 24,
        textAlign: "center",
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    termsText: {
        marginLeft: 10,
        fontFamily: fonts.primary[400],
        color: 'gray',
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
});
