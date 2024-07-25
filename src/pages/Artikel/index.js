import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { colors, windowWidth } from '../../utils'

export default function Artikel({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  };


  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  useEffect(() => {

    if (isFocused) {
      getTransaction();
    }


  }, [isFocused]);


  const getTransaction = () => {
    axios.post(apiURL + 'artikel').then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1, width: '100%', height: '100%',
    }}>
      <MyHeader onPress={backPage} judul="Artikel" />
      <View style={{
        flex: 1,
        padding: 16
      }}>
        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ArtikelDetail', item)} style={{
              marginVertical: 8,

            }}>
              <Image source={{
                uri: item.image
              }} style={{
                width: '100%',
                borderRadius: 12,
                height: windowWidth,
                resizeMode: 'contain'
              }} />
            </TouchableOpacity>
          )
        }} />
      </View>
    </ImageBackground>
  )
}