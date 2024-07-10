import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'

export default function Artikel({navigation}) {
    const backPage = () => {
        navigation.goBack()
      };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex:1,  width:'100%', height:'100%', 
    }}>
    <MyHeader onPress={backPage} judul="Artikel"/>
    <ScrollView>
        <View style={{padding:10}}>

        </View>
    </ScrollView>
    </ImageBackground>
  )
}