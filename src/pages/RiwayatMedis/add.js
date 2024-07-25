import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyHeader, MyInput, UploadFileComponent } from '../../components'
import { colors, fonts } from '../../utils'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
export default function AddRiwayatMedis({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  };

  const [user, setUser] = useState({})
  const [kirirm, setKirim] = useState({
    nama_file: '',
    berkas: {
      name: null
    }
  });

  useEffect(() => {
    getData('user').then(res => {
      setUser(res)
    })
  }, [])

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      });
      setKirim({ ...kirirm, berkas: res[0] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };


  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1,
      width: '100%',
      height: '100%',
    }}>
      <MyHeader onPress={backPage} judul="Tambah Riwayat Medis" />
      <ScrollView>
        <View style={{ padding: 10 }}>

          {/* NAMA FILE */}
          <MyInput placeholder="Isi Nama File" label="Nama File" onChangeText={x => setKirim({ ...kirirm, nama_file: x })} />

          <Text style={styles.label}>Upload File</Text>
          <TouchableOpacity
            style={[styles.uploadButton, kirirm.berkas ? styles.fileSelected : styles.fileNotSelected]}
            onPress={selectFile}
          >
            <Text style={[styles.uploadButtonText, kirirm.berkas ? styles.textSelected : styles.textNotSelected]}>
              {kirirm.berkas.name ? kirirm.berkas.name : 'Pilih file'}
            </Text>
            <Image source={require('../../assets/uploadfile.png')} style={styles.uploadIcon} />
          </TouchableOpacity>
          <Text style={styles.fileInfo}>
            *File yg diunggah maksimal berukuran 5 MB
          </Text>

        </View>
      </ScrollView>
      <View style={{ padding: 20, marginBottom: 10 }}>
        <MyButton onPress={() => {
          console.log(kirirm)
          const sendData = new FormData();
          sendData.append('berkas', {
            name: kirirm.berkas.name,
            type: kirirm.berkas.type,
            uri: kirirm.berkas.uri,
          });
          sendData.append('nama_file', kirirm.nama_file);
          sendData.append('fid_user', user.id);

          axios.post(apiURL + 'add_medis', sendData).then(res => {
            console.log(res.data);
            if (res.data == 200) {
              showMessage({
                type: 'success',
                message: 'Data berhasil disimpan !'
              });
              navigation.goBack();
            }
          })


        }} title="Simpan" />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontFamily: fonts.primary[400],
    fontSize: 15,
    color: colors.primary,
  },
  uploadButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileNotSelected: {
    backgroundColor: 'white',
  },
  fileSelected: {
    backgroundColor: colors.primary,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
  },
  textNotSelected: {
    color: '#888888',
  },
  textSelected: {
    color: 'white',
  },
  uploadIcon: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  fileInfo: {
    marginTop: 10,
    fontSize: 12,
    color: '#555555',
    left: 15,
    fontFamily: fonts.primary[400],
  },
});
