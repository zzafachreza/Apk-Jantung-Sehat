import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Picker, Modal, Image } from 'react-native';
import { MyButton, MyHeader, MyInput, MyCalendar } from '../../components';
import { ScrollView } from 'react-native';
import { colors, fonts } from '../../utils';
import { showMessage } from 'react-native-flash-message';

export default function AddAlarmObat({ navigation }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [berapaKali, setBerapaKali] = useState('');
  const [jumlahDurasi, setJumlahDurasi] = useState('');
  const [satuanDurasi, setSatuanDurasi] = useState('');
  const [jumlahJenis, setJumlahJenis] = useState('');
  const [jenisObat, setJenisObat] = useState('');
  const [namaObat, setNamaObat] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [waktuSehari, setWaktuSehari] = useState([]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSave = () => {
    if (!namaObat || !tanggal || !berapaKali || !jumlahDurasi || !satuanDurasi || !jumlahJenis || !jenisObat || !selectedTime) {
      showMessage({
        message: 'Semua inputan harus diisi',
        type: 'danger',
      });
      return;
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    // Navigation or other logic here
  };

  const handleJumlahDurasiChange = (itemValue) => {
    setBerapaKali(itemValue);
    const times = [];
    for (let i = 0; i < itemValue; i++) {
      times.push(`${7 + i * 2}:00`); // Example logic to generate times
    }
    setWaktuSehari(times);
  };

  const backPage = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
      <MyHeader onPress={backPage} judul="Tambah Obat" />
      <ScrollView>
        <View style={styles.container}>
          <MyInput
            label="Nama Obat"
            placeholder="Isi Nama Obat"
            value={namaObat}
            onChangeText={(text) => setNamaObat(text)}
          />
          <MyCalendar
            label="Tanggal"
            placeholder="Pilih Tanggal"
            value={tanggal}
            onDateChange={(date) => setTanggal(date)}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Berapa Kali dalam Sehari</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={berapaKali}
              onValueChange={(itemValue, itemIndex) => handleJumlahDurasiChange(itemValue)}
            >
              <Picker.Item label="Pilih" value="" />
              <Picker.Item label="1x" value="1" />
              <Picker.Item label="2x" value="2" />
              <Picker.Item label="3x" value="3" />
              <Picker.Item label="4x" value="4" />
              <Picker.Item label="5x" value="5" />
            </Picker>
          </View>

          {waktuSehari.length > 0 && (
            <View style={styles.timeListContainer}>
              {waktuSehari.map((time, index) => (
                <View key={index} style={styles.timeItem}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={[styles.label, { marginTop: 20 }]}>Durasi Minum Obat</Text>
          <View style={styles.row}>
            <View style={styles.halfPicker}>
              <Picker
                selectedValue={jumlahDurasi}
                onValueChange={(itemValue, itemIndex) => setJumlahDurasi(itemValue)}
              >
                <Picker.Item label="Pilih Jumlah" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
            <View style={styles.halfPicker}>
              <Picker
                selectedValue={satuanDurasi}
                onValueChange={(itemValue, itemIndex) => setSatuanDurasi(itemValue)}
              >
                <Picker.Item label="Pilih Satuan" value="" />
                <Picker.Item label="Hari" value="hari" />
                <Picker.Item label="Minggu" value="minggu" />
                <Picker.Item label="Bulan" value="bulan" />
              </Picker>
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>Jenis Obat</Text>
          <View style={styles.row}>
            <View style={styles.halfPicker}>
              <Picker
                selectedValue={jumlahJenis}
                onValueChange={(itemValue, itemIndex) => setJumlahJenis(itemValue)}
              >
                <Picker.Item label="Pilih Jumlah" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
              </Picker>
            </View>
            <View style={styles.halfPicker}>
              <Picker
                selectedValue={jenisObat}
                onValueChange={(itemValue, itemIndex) => setJenisObat(itemValue)}
              >
                <Picker.Item label="Pilih Jenis" value="" />
                <Picker.Item label="Tablet" value="tablet" />
                <Picker.Item label="Kaplet" value="kaplet" />
                <Picker.Item label="Kapsul" value="kapsul" />
                <Picker.Item label="ml" value="ml" />
                <Picker.Item label="Sendok" value="sendok" />
                <Picker.Item label="Tetes" value="tetes" />
                <Picker.Item label="Sachet" value="sachet" />
                <Picker.Item label="Tube" value="tube" />
                <Picker.Item label="Olesan" value="olesan" />
                <Picker.Item label="Suppositoric" value="suppositoric" />
              </Picker>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <TouchableOpacity style={[styles.timeButton, selectedTime === 'sebelum' && styles.selectedTimeButton]} onPress={() => handleTimeSelect('sebelum')}>
              <Image source={require('../../assets/before_meal.png')} style={styles.beforeMealIcon} />
              <Text style={[styles.timeText, { textAlign: 'center' }]}>Sebelum Makan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timeButton, selectedTime === 'saat' && styles.selectedTimeButton]} onPress={() => handleTimeSelect('saat')}>
              <Image source={require('../../assets/during_meal.png')} style={styles.duringMealIcon} />
              <Text style={[styles.timeText, { textAlign: 'center' }]}>Saat Makan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timeButton, selectedTime === 'setelah' && styles.selectedTimeButton]} onPress={() => handleTimeSelect('setelah')}>
              <Image source={require('../../assets/after_meal.png')} style={styles.afterMealIcon} />
              <Text style={[styles.timeText, { textAlign: 'center' }]}>Setelah Makan</Text>
            </TouchableOpacity>
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
            <Text style={styles.modalText}>Berhasil menyimpan alarm!</Text>
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
  },
  label: {
    fontFamily: fonts.primary[400],
    color: colors.primary,
    marginBottom: 0,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfPicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E7E8EE',
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#E7E8EE',
    backgroundColor: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
  },
  selectedTimeButton: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  beforeMealIcon: {
    width: 45.72,
    height: 29.53,
    marginBottom: 5,
  },
  duringMealIcon: {
    width: 56.07,
    height: 29.53,
    marginBottom: 5,
  },
  afterMealIcon: {
    width: 56.35,
    height: 29.53,
    marginBottom: 5,
  },
  timeText: {
    fontFamily: fonts.primary[400],
    color: colors.primary,
    textAlign: 'center',
  },
  timeListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  timeItem: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#DEDEDE',
    marginRight: 5,
    marginBottom: 5,
  },
  timeText: {
    fontFamily: fonts.primary[400],
    color: colors.primary,
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 10,
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
