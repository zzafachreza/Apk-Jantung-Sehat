import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyHeader, MyInput } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { fonts } from '../../utils'
import { showMessage } from 'react-native-flash-message'
import { apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'

export default function AddTensi({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  };

  const [kirim, setKirim] = useState({
    gula: '',
    sistole: '',
    diastole: '',
  });

  const [hasil, setHasil] = useState({
    tensi: '',
    gula: ''
  })
  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1, width: '100%', height: '100%',
    }}>
      <MyHeader onPress={backPage} judul="Tambah Tensi" />

      <View style={{ padding: 20 }}>
      </View>
      <ScrollView>
        <View style={{ padding: 10 }}>


          {/* KADAR GULA */}
          <MyInput label="Kadar Gula" onChangeText={x => setKirim({ ...kirim, gula: x })} placeholder="Isi Kadar Gula" unitText="mg/dl"
            keyboardType="numeric"
          />

          {/* Sistole */}
          <MyInput label="Sistole" onChangeText={x => setKirim({ ...kirim, sistole: x })} placeholder="Isi Jumlah Sistole" unitText="mmHg"
            keyboardType="numeric"
          />

          {/* Sistole */}
          <MyInput label="Diastole" onChangeText={x => setKirim({ ...kirim, diastole: x })} placeholder="Isi Jumlah Diastole" unitText="mmHg"
            keyboardType="numeric"
          />


          {/* Cek */}

          <View style={{ padding: 50 }}>
            <MyButton title="Cek" onPress={() => {
              if (kirim.gula.length == 0) {
                showMessage({ message: 'Kadar gula wajub di isi!' })
              } else if (kirim.sistole.length == 0) {
                showMessage({ message: 'Sistole wajub di isi!' })
              } else if (kirim.diastole.length == 0) {
                showMessage({ message: 'Diastole wajub di isi!' })
              } else {
                let hasilStatus = '';
                let hasilGula = '';
                if (kirim.sistole < 90 && kirim.diastole < 60) {
                  hasilStatus = 'Hipotensi';
                } else if (kirim.sistole > 140) {
                  hasilStatus = 'Hipertensi';
                } else if (kirim.diastole < 90) {
                  hasilStatus = 'Hipotensi';
                } else if ((kirim.sistole >= 90 && kirim.sistole <= 140) && (kirim.diastole >= 60 && kirim.diastole <= 90)) {
                  hasilStatus = 'Normal';
                } else if (kirim.sistole > 140 && kirim.diastole > 90) {
                  hasilStatus = 'Hipertensi';
                } else if (kirim.sistole >= 90 && kirim.sistole <= 140) {
                  hasilStatus = 'Normal';
                } else if (kirim.diastole >= 60 && kirim.diastole <= 90) {
                  hasilStatus = 'Normal';
                }


                if (kirim.gula < 70) {
                  hasilGula = "Hipoglikemi";
                } else if (kirim.gula >= 70 && kirim.gula <= 200) {
                  hasilGula = "Normal";
                } else if (kirim.gula > 200) {
                  hasilGula = "Hiperglikemi";
                }


                console.log(hasilStatus);
                console.log(hasilGula);
                setHasil({
                  tensi: hasilStatus,
                  gula: hasilGula
                })
              }
            }} />


          </View>
          {hasil.gula.length > 0 &&

            <>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <View>
                  <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                  }}>Tensi</Text>
                  <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 20
                  }}>{hasil.tensi}</Text>
                </View>
                <View>
                  <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                  }}>Gula Darah</Text>
                  <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 20
                  }}>{hasil.gula}</Text>
                </View>
              </View>
              <View style={{
                marginTop: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400], fontSize: 12,
                  lineHeight: 20,
                }}>1. Hindari minum obat hipertensi jika tensi dibawah normal
                </Text>
                <Text style={{
                  fontFamily: fonts.secondary[400], fontSize: 12,
                  lineHeight: 20,
                }}>2. Hindari minum obat DM jika kadar glukosa dibawah normal</Text>
              </View>
            </>
          }
        </View>
      </ScrollView>

      <View style={{
        padding: 20,
        marginBottom: 10
      }}>
        <MyButton title="Simpan" onPress={() => {

          getData('user').then(uu => {
            axios.post(apiURL + 'add_tensi', {
              fid_user: uu.id,
              gula: kirim.gula,
              sistole: kirim.sistole,
              diastole: kirim.diastole,
              hasil_gula: hasil.gula,
              hasil_tensi: hasil.tensi
            }).then(res => {
              console.log(res.data);
              if (res.data == 200) {
                showMessage({ type: 'success', message: 'Data berhasil disimpan !' });
                navigation.goBack();
              }
            })
          })

        }} />
      </View>
    </ImageBackground>
  )
}