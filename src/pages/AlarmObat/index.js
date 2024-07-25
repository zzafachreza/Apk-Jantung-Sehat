import { View, Text, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { apiURL, getData, MYAPP } from '../../utils/localStorage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'

export default function AlarmObat({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  };

  const [data, setData] = useState([]);
  const __getTransaction = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'obat', {
        fid_user: uu.id
      }).then(res => {
        console.log(res.data);
        setData(res.data);

      })
    })
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getTransaction()
    }
  }, [isFocused]);


  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1, width: '100%', height: '100%',
    }}>
      <MyHeader onPress={backPage} judul="Alarm Obat" />

      <View style={{
        flex: 1,
        padding: 16
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (

            <View style={{
              borderWidth: 1,
              borderRadius: 12,
              borderColor: colors.border,
              padding: 10,
              marginVertical: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={{
                flex: 1,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.primary
                }}>{item.nama_obat}</Text>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 14,
                  color: colors.primary
                }}>Diminum selama {item.jumlah_durasi} {item.satuan_durasi}</Text>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 14,
                  color: colors.primary
                }}>{item.minum_sehari}x sehari {item.waktu} makan</Text>
                <Text style={{
                  marginTop: 5,
                  fontFamily: fonts.secondary[800],
                  fontSize: 12,
                  color: colors.black
                }}>Pukul ( {item.alarm} ) WIB</Text>
              </View>

              <TouchableOpacity style={{
                padding: 10,
              }} onPress={() => {
                Alert.alert(MYAPP, 'Apakah kamu akan hapus ini ?', [
                  { text: 'TIDAK' },
                  {
                    text: 'Ya, Hapus',
                    onPress: () => {
                      axios.post(apiURL + 'delete_obat', {
                        id_obat: item.id_obat
                      }).then(res => {
                        if (res.data == 200) {
                          showMessage({ type: 'success', message: 'Data berhasil dihapus!' });
                          __getTransaction();
                        }
                      })
                    }
                  }
                ])
              }}>
                <Icon type='ionicon' name='trash' color={colors.danger} size={24} />
              </TouchableOpacity>
            </View>

          )
        }} />
      </View>
      <View style={{
        flexDirection: "row", justifyContent: 'flex-end', padding: 10,
        marginBottom: 10
      }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('AddAlarmObat')}>
          <View>
            <Image source={require('../../assets/plus.png')} style={{
              width: 70, height: 70,
            }} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </ImageBackground>
  )
}