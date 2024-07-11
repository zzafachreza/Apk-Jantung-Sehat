import { View, Text, ImageBackground, ScrollView, TouchableWithoutFeedback, Image, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MyButton, MyHeader, MyInput } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

export default function AlarmOlahraga({ navigation }) {
  const [namaOlahraga, setNamaOlahraga] = useState('');
  const [durasiWaktu, setDurasiWaktu] = useState('');
  const [satuanDurasi, setSatuanDurasi] = useState('menit'); // Default satuan durasi
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  useEffect(() => {
    const totalDuration = satuanDurasi === 'jam' ? durasiWaktu * 3600 : durasiWaktu * 60;
    if (time >= totalDuration) {
      setTimerActive(false);
    }
  }, [time, durasiWaktu, satuanDurasi]);

  const handleStart = () => {
    if (namaOlahraga && durasiWaktu) {
      setTimerActive(true);
    } else {
      showMessage({
        message: 'Tolong Isi Nama Olahraga & Durasi Waktu!',
        backgroundColor: colors.danger,
      });
    }
  };

  const handleFinish = async () => {
    setTimerActive(false);

    const newHistoryItem = {
      id: new Date().getTime(), // Unique ID for each entry
      namaOlahraga,
      durasiWaktu: `${durasiWaktu} ${satuanDurasi}`,
      tanggal: new Date().toLocaleDateString(),
      waktu: new Date().toLocaleTimeString()
    };

    try {
      const existingHistory = await AsyncStorage.getItem('riwayatOlahraga');
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      history.push(newHistoryItem);

      await AsyncStorage.setItem('riwayatOlahraga', JSON.stringify(history));
      navigation.navigate('HistoryAlaramOlahraga');
    } catch (error) {
      console.error('Error saving to local storage', error);
    }

    setTime(0);
    setNamaOlahraga('');
    setDurasiWaktu('');
    setSatuanDurasi('menit'); // Reset satuan durasi to default
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const backPage = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
      <MyHeader onPress={backPage} judul='Alarm Olahraga' />
      {timerActive ? (
        <View style={styles.timerContainer}>
          <Text style={styles.namaOlahraga}>{namaOlahraga}</Text>
          <Text style={styles.timer}>{formatTime(time)}</Text>
          {time >= (satuanDurasi === 'jam' ? durasiWaktu * 3600 : durasiWaktu * 60) && (
            <MyButton title="Selesai" onPress={handleFinish} />
          )}
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <MyInput
              label='Nama Olahraga'
              placeholder='Isi Nama Olahraga'
              value={namaOlahraga}
              onChangeText={setNamaOlahraga}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Durasi Waktu</Text>
              <View style={styles.row}>
                <View style={styles.halfPicker}>
                  <Picker
                    selectedValue={durasiWaktu}
                    onValueChange={(itemValue, itemIndex) => setDurasiWaktu(itemValue)}
                  >
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((item, index) => (
                      <Picker.Item key={index} label={`${item}`} value={item} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.halfPicker}>
                  <Picker
                    selectedValue={satuanDurasi}
                    onValueChange={(itemValue, itemIndex) => setSatuanDurasi(itemValue)}
                  >
                    <Picker.Item label="Menit" value="menit" />
                    <Picker.Item label="Jam" value="jam" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {!timerActive ? (
        <View style={styles.buttonContainer}>
          <MyButton title="Mulai" onPress={handleStart} />
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
      ) : (
        <View style={styles.buttonContainer}>
          <MyButton title="Selesai" onPress={handleFinish} />
        </View>
      )}
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
    padding: 10,
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
    marginTop: 20,
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
