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
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        storeData('user', res.data.data);
                        navigation.replace('Home');
                    });


            }
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader judul="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>




                <MyInput label="Nama Lengkap" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={5} />

                <MyPicker label="Jenis User" value={kirim.tipe} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        tipe: x
                    })
                }} data={[
                    { label: 'Pasien', value: 'Pasien' },
                    { value: 'Pendamping', label: 'Pendamping' },

                ]} />
                <MyGap jarak={5} />
                <MyInput label="Email" value={kirim.email} onChangeText={x => setKirim({ ...kirim, email: x })} />


                <MyGap jarak={5} />
                <MyInput label="Telepon" keyboardType="phone-pad" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={5} />
                <MyInput label="Jenis Penyakit" value={kirim.jenis_penyakit} onChangeText={x => setKirim({ ...kirim, jenis_penyakit: x })} />

                <MyGap jarak={5} />

                <MyPicker iconname="male-female-outline" label="Jenis Kelamin" value={kirim.jenis_kelamin} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })
                }} data={[
                    { label: 'Laki-laki', value: 'Laki-laki' },
                    { value: 'Perempuan', label: 'Perempuan' },

                ]} />

                <MyGap jarak={20} />
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 14,
                    marginBottom: 12,
                }}>Data Pribadi</Text>
                <MyInput label="Tinggi Badan ( cm )" keyboardType="number-pad" value={kirim.tinggi_badan} onChangeText={x => setKirim({ ...kirim, tinggi_badan: x })} />
                <MyGap jarak={5} />
                <MyInput label="Berat Badan ( kg )" keyboardType="number-pad" value={kirim.berat_badan} onChangeText={x => setKirim({ ...kirim, berat_badan: x })} />
                <MyGap jarak={5} />
                <MyInput label="Tempat Lahir" value={kirim.tempat_lahir} onChangeText={x => setKirim({ ...kirim, tempat_lahir: x })} />
                <MyGap jarak={5} />
                <MyCalendar value={kirim.tanggal_lahir} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })
                }} valueShow={moment(kirim.tanggal_lahir).format('DD MMMM YYYY')} label="Tanggal Lahir" iconname="calendar-outline" />

                <MyGap jarak={5} />
                <MyInput label="Alamat" placeholder="masukan alamat" multiline value={kirim.alamat} onChangeText={x => setKirim({ ...kirim, alamat: x })} />

                <MyGap jarak={5} />

                <MyInput label="Password" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.secondary} colorText={colors.primary} iconColor={colors.primary} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})