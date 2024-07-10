import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { MyButton, MyHeader, MyInput, UploadFileComponent } from '../../components'
import { colors } from '../../utils'

export default function AddRiwayatMedis({navigation}) {
    const backPage = () => {
        navigation.goBack()
      };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex:1, 
        width:'100%',
        height:'100%',
    }}>
    <MyHeader onPress={backPage} judul="Tambah Riwayat Medis"/>
    <ScrollView>
     <View style={{padding:10}}>

        {/* NAMA FILE */}
        <MyInput placeholder="Isi Nama File" label="Nama File"/>

        <UploadFileComponent/>

     </View>
    </ScrollView>
    <View style={{padding:20, marginBottom:10}}>
            <MyButton title="Simpan"/>
    </View>
    </ImageBackground>
  )
}