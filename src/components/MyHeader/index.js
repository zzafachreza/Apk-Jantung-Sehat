import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress, langkah, judul }) {

  return (


    <ImageBackground source={require('../../assets/bgheader.png')} style={{
      flexDirection: 'row',
      backgroundColor: colors.primary,
      padding: 5,
      height: 80,
      marginBottom: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      borderBottomWidth: 0,
      borderBottomColor: colors.border,
      justifyContent:"center",
      
    }}>
    <View style={{left: -30}}>
      <TouchableOpacity onPress={onPress} style={{
        padding: 5,
      
      }}>
        <Icon type='ionicon' name='chevron-back-outline' size={MyDimensi / 2} color={colors.white} />
      </TouchableOpacity>
    </View>

    <View style={{
      left:-10,
      top:2,
    }}>
   

      <Text style={{
        textAlign: 'center',
        fontFamily: fonts.primary[600],
        fontSize: 20, 
        color: colors.white
      }}>{judul}</Text>
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({});
