import { View, Text, ImageBackground, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from 'react-native-elements';

export default function HistoryAlarmOlahraga({ navigation }) {
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getTransaction();
    }

  }, [isFocus]);

  const __getTransaction = () => {
    getData('olahraga').then(res => {
      if (!res) {
        setData([])
      } else {
        setData(res)
      }
    })
  }


  const backPage = () => {
    navigation.goBack()
  };
  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
      <MyHeader onPress={backPage} judul='Riwayat Olahraga' />
      <View style={{
        flex: 1,
        padding: 16
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (

            <View style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 5,
              borderRadius: 12,
              borderColor: colors.border,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  flex: 1,
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 25,
                    color: colors.primary,
                  }}>{item.nama_olahraga}</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 11,
                    color: colors.border,
                  }}>{item.tanggal} {item.jam}</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}>
                  <Text style={{
                    textAlign: 'right',
                    fontFamily: fonts.secondary[600],
                    fontSize: 25,
                    color: colors.primary,
                  }}>{item.real}</Text>
                </View>
                <TouchableOpacity style={{
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} onPress={() => {
                  let tmp = [...data];
                  tmp.splice(index, 1);
                  console.log(tmp);
                  setData(tmp);
                  storeData('olahraga', tmp)
                }}>
                  <Icon type='ionicon' name='trash' color={colors.danger} />
                </TouchableOpacity>
              </View>
            </View>

          )
        }} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: '100%',
  },
  container: {
    padding: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  historyItemText: {
    flex: 1,
  },
  historyItemTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
  },
  historyItemSubtitle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.secondary,
    marginTop: 5,
  },
  historyItemDuration: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
  },
});
