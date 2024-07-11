import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { MyButton, MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'

export default function RiwayatTensi({navigation}) {
    const backPage = () => {
        navigation.goBack()
      };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex:1,  width:'100%', height:'100%', 
    }}>
    <MyHeader onPress={backPage} judul="Riwayat"/>

    <ScrollView>
        <View style={{padding:10}}>

        </View>
    </ScrollView>

    <View style={{flexDirection:"row", justifyContent:'flex-end', padding:10, 
    marginBottom:10}}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('AddTensi')}>
                <View>
                        <Image source={require('../../assets/plus.png')} style={{
                            width:70, height:70, 
                        }}/>
                </View>
            </TouchableNativeFeedback>
    </View>
    </ImageBackground>
  )
}