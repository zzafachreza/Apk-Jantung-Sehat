import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { colors, fonts } from '../../utils';

export default function UploadFileComponent() {
  const [file, setFile] = useState(null);
  const [nama_file, setNamaFile] = useState('')

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      });
      setFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload File</Text>
      <TouchableOpacity
        style={[styles.uploadButton, file ? styles.fileSelected : styles.fileNotSelected]}
        onPress={selectFile}
      >
        <Text style={[styles.uploadButtonText, file ? styles.textSelected : styles.textNotSelected]}>
          {file ? file.name : 'Pilih file'}
        </Text>
        <Image source={require('../../assets/uploadfile.png')} style={styles.uploadIcon} />
      </TouchableOpacity>
      <Text style={styles.fileInfo}>
        *File yg diunggah maksimal berukuran 5 MB
      </Text>
    </View>
  );
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
