import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { MyButton, MyHeader, MyInput } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'

export default function AddTensi({navigation}) {
    const backPage = () => {
        navigation.goBack()
      };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex:1,  width:'100%', height:'100%', 
    }}>
    <MyHeader onPress={backPage} judul="Tambah Tensi"/>

    <View style={{padding:20}}>
    </View>
    <ScrollView>
        <View style={{padding:10}}>


        {/* KADAR GULA */}
        <MyInput label="Kadar Gula" placeholder="Isi Kadar Gula" unitText="mg/dl" 
            keyboardType="numeric"
        />

        {/* Sistole */}
        <MyInput label="Sistole" placeholder="Isi Jumlah Sistole" unitText="mmHg"
            keyboardType="numeric"
        />

          {/* Sistole */}
          <MyInput label="Diastole" placeholder="Isi Jumlah Diastole" unitText="mmHg"
            keyboardType="numeric"
          />


            {/* Cek */}
            
            <View style={{padding:50}}>
                <MyButton title="Cek"/>
            </View>

        </View>
    </ScrollView>

    <View style={{padding:20, 
    marginBottom:10}}>
            <MyButton title="Simpan"/>
    </View>
    </ImageBackground>
  )
}