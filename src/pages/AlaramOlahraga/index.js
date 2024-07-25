import { View, Text, ImageBackground, ScrollView, TouchableWithoutFeedback, Image, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MyButton, MyHeader, MyInput, MyPicker } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

export default function AlarmOlahraga({ navigation }) {

  const [kirim, setKirim] = useState({
    nama_olahraga: '',
    durasi: '',
    satuan: 'Detik'

  })

  const backPage = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
      <MyHeader onPress={backPage} judul='Alarm Olahraga' />

      <ScrollView>
        <View style={styles.container}>
          <MyInput
            label='Nama Olahraga'
            placeholder='Isi Nama Olahraga'
            onChangeText={x => setKirim({ ...kirim, nama_olahraga: x })}
          />
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              paddingRight: 5,
            }}>
              <MyInput placeholder="0" label="Durasi" onChangeText={x => setKirim({ ...kirim, durasi: x })} keyboardType='number-pad' />
            </View>
            <View style={{
              flex: 1,
              paddingLeft: 5,
            }}>
              <MyPicker value={kirim.satuan} label="Waktu" data={[
                { label: 'Detik', value: 'Detik' },
                { label: 'Menit', value: 'Menit' },
                { label: 'Jam', value: 'Jam' },
              ]} onValueChange={x => setKirim({ ...kirim, satuan: x })} />
            </View>
          </View>
        </View>
      </ScrollView>


      <View style={styles.buttonContainer}>
        <MyButton title="Mulai" onPress={() => {

          if (kirim.nama_olahraga.length === 0) {
            showMessage({ message: 'Nama olahraga silahkan di isi' })
          } else if (kirim.durasi.length === 0) {
            showMessage({ message: 'Durasi silahkan di isi' })
          } else {
            console.log(kirim);
            let durasiNew = 0;
            if (kirim.satuan == 'Menit') {
              durasiNew = (kirim.durasi * 60) * 1000;
            } else if (kirim.satuan == 'Jam') {
              durasiNew = (kirim.durasi * 3600) * 1000;
            } else {
              durasiNew = kirim.durasi * 1000
            }

            console.log('Durasi Real', durasiNew)
            navigation.replace('StopwatchPage', {
              nama_olahraga: kirim.nama_olahraga,
              satuan: kirim.satuan,
              durasi: durasiNew
            })
          }
        }} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('HistoryAlaramOlahraga')}>
          <View style={styles.historyButton}>
            <View style={styles.historyIconContainer}>
              <Image source={require('../../assets/burgermenu.png')} style={styles.historyIcon} />
            </View>
            <View style={styles.historyTextContainer}>
              <Text style={styles.historyText}>Riwayat Olahraga</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: '100%',
  },
  container: {
    padding: 16,
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 10,
  },
  historyButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  historyIconContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  historyIcon: {
    width: 18,
    height: 10,
  },
  historyTextContainer: {
    justifyContent: 'center',
    alignContent: "center",
    top: 2,
  },
  historyText: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
  },
  pickerContainer: {
    marginTop: 10,
    padding: 10,
  },
  label: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  halfPicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E7E8EE',
    backgroundColor: 'white',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namaOlahraga: {
    fontFamily: fonts.primary[600],
    fontSize: 24,
    color: colors.primary,
  },
  timer: {
    fontFamily: fonts.primary[600],
    fontSize: 48,
    color: colors.primary,
    marginTop: 20,
  },
});
