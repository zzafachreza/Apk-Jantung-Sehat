import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { colors, fonts, MyDimensi, windowWidth } from '../../utils'
import RenderHtml from 'react-native-render-html';
export default function ArtikelDetail({ navigation, route }) {
    const backPage = () => {
        navigation.goBack()
    };

    const item = route.params;
    console.log(item.keterangan)


    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={{
            flex: 1, width: '100%', height: '100%',
        }}>
            <MyHeader onPress={backPage} judul="Artikel Detail" />

            <View style={{
                flex: 1,
                padding: 16
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        width: '100%',
                        borderRadius: 12,
                        height: windowWidth,
                        resizeMode: 'contain'
                    }} />

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 3.5
                    }}>{item.judul}</Text>


                    <RenderHtml
                        contentWidth={windowWidth}
                        source={{
                            html: item.keterangan
                        }}
                    />
                </ScrollView>
            </View>



        </ImageBackground >
    )
}