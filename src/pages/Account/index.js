import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [comp, setComp] = useState({
        website: '',
        tlp: '',
    });
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(true);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {

                setUser(res);

            });

            axios.post(apiURL + 'company').then(res => {
                console.log(res.data);
                setComp(res.data.data);
            })
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    paddingTop: 2,
                    paddingHorizontal: 10,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.primary,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>


            <MyHeader judul="Profile" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView>
                {open &&
                    <>


                        <View style={{
                            margin: 5,
                            flex: 1,
                        }}>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: 100,
                                    height: 100,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    overflow: 'hidden',
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Image source={{
                                        uri: user.foto_user
                                    }} style={{
                                        width: 100,
                                        height: 100,

                                    }} />

                                </View>
                            </View>

                            <View style={{ padding: 10, }}>
                                <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                                <MyList label="Jenis User" value={user.tipe} />
                                <MyList label="Email" value={user.email} />
                                <MyList label="Telepon" value={user.telepon} />
                                <MyList label="Jenis Penyakit" value={user.jenis_penyakit} />
                                <MyList label="Jenis Kelamin" value={user.jenis_kelamin} />

                                <View style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 14,
                                        marginBottom: 12,
                                    }}>Data Pribadi</Text>
                                    <MyList label="Umur" value={moment().diff(user.tanggal_lahir, 'year') + ' Tahun'} />
                                    <MyList label="Tinggi Badan" value={user.tinggi_badan + ' cm'} />
                                    <MyList label="Berat Badan" value={user.berat_badan + ' kg'} />
                                    <MyList label="Tempat Lahir" value={user.tempat_lahir} />
                                    <MyList label="Tanggal Lahir" value={user.tanggal_lahir} />
                                    <MyList label="Alamat" value={user.alamat} />
                                </View>





                            </View>
                            {/* data detail */}
                        </View>
                    </>
                }
                <View style={{
                    padding: 20,
                }}>

                    <TouchableOpacity onPress={() => Linking.openURL(comp.website)}>
                        <Image source={require('../../assets/bagikan.png')} style={{
                            width: 120,
                            height: 40,
                            resizeMode: 'contain'
                        }} />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=' + comp.tlp)} style={{
                        marginVertical: 20,
                    }}>
                        <Image source={require('../../assets/hubungi.png')} style={{
                            width: 150,
                            height: 50,
                            resizeMode: 'contain'
                        }} />
                    </TouchableOpacity>

                    <MyButton warna={colors.primary} title="Edit Profile" Icons="create-outline" iconColor={colors.white} onPress={() => navigation.navigate('AccountEdit', user)} />
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={colors.secondary} title="Log Out" Icons="log-out-outline" iconColor={colors.primary} colorText={colors.primary} />
                </View>
                <MyGap jarak={40} />
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
