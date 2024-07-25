import { Alert, StyleSheet, Text, View, Image, PermissionsAndroid, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'moment/locale/id';
import { MyGap, MyHeader } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import MyMenu from '../../components/MyMenu';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import SoundPlayer from 'react-native-sound-player'

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [carouselData, setCarouselData] = useState([]);

  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const carouselRef = useRef(null);

  const PlaySuara = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('obat', 'mp3')
      // or play from url

    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }


  const requestNotificationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      )
    } catch (err) {
      console.warn('requestNotificationPermission error: ', err)
    }
  }

  const _getTransaction = async () => {
    await getData('user').then(u => {
      setUser(u);
    });

    await axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    });

    await axios.post(apiURL + 'artikel').then(res => {
      setCarouselData(res.data);
    })
  }

  useEffect(() => {
    requestNotificationPermission();
    if (isFocus) {
      _getTransaction();
      updateTOKEN();
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'JantungSehatID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)
        vibrate: true,
        playSound: true,
        soundName: 'android.resource://com.jantungsehat/raw/obat'

      });
      // PlaySuara()

    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      PushNotification.localNotification({
        /* Android Only Properties */
        priority: 'high',
        importance: Importance.HIGH,
        channelId: 'JantungSehatID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)
        soundName: 'obat',
        playSound: true,
        vibrate: true,

      });
    });




    return unsubscribe;

  }, [isFocus]);

  const updateTOKEN = () => {
    getData('user').then(uu => {
      setUser(uu);

      axios.post(apiURL + 'get_token', {
        id: uu.id
      }).then(res => {

        getData('token').then(token => {
          console.log(token.token);
          // alert(token.token);

          if (token.token !== res.data) {
            console.log('update TOKEN');
            axios.post(apiURL + 'update_token', {
              id: uu.id,
              token: token.token
            }).then(resp => {
              // console.log('token berhasil diperbaharui', resp.data)
            })
          } else {
            // console.log('token terbaru')
          }
        })

      })


    })
  }

  const _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ArtikelDetail', item)}>
        <View style={styles.carouselItem}>
          <Image source={{
            uri: item.image
          }} style={styles.carouselImage} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
      {/* HEADER HOME */}
      <ImageBackground source={require('../../assets/bgheader.png')} style={{ padding: 10, flexDirection: 'row', justifyContent: "space-between", paddingTop: 20 }}>
        {/* NAMA USER */}
        <View>
          <Text style={{ color: colors.white, fontFamily: fonts.primary[300], fontSize: 20 }}>Ha, {user.nama_lengkap}</Text>
          <Text style={{ color: colors.white, fontFamily: fonts.primary[600], fontSize: 12 }}>Jangan Biarkan Penyakit Jantung{'\n'}Menghalangi Langkahmu. Tetap Semangat!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            PushNotification.localNotification({
              /* Android Only Properties */

              channelId: 'JantungSehatID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
              title: 'test', // (optional)
              message: '123', // (required)
              vibrate: true,
              playSound: true,
              soundName: 'android.resource://com.jantungsehat/raw/obat'


            });
            // PlaySuara()
          }}>
            <Image source={require('../../assets/logo.png')} style={{ width: 46, height: 71 }} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* DISINI BAUTKAN COROUSEL */}
          <Carousel
            ref={carouselRef}
            data={carouselData}
            renderItem={_renderItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth / 1.5}
            layout={'default'}
          />
          {/* END COROUSEL */}
        </View>

        {/* MENU */}
        <View style={{ padding: 10 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

            {/* ALARM OBAT */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AlarmObat')}>
              <View >
                <Image source={require('../../assets/alarm_obat.png')} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                <Text style={{ textAlign: "center", fontFamily: fonts.primary[400], fontSize: 14, }}>Alarm Obat</Text>
              </View>
            </TouchableWithoutFeedback>

            {/* Alarm Olahraga */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AlaramOlahraga')}>
              <View >
                <Image source={require('../../assets/alarm_olahraga.png')} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                <Text style={{ textAlign: "center", fontFamily: fonts.primary[400], fontSize: 14, }}>Alarm Olahraga</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <MyGap jarak={15} />

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {/* RIWAYAT MEDIS */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('RiwayatMedis')}>
              <View >
                <Image source={require('../../assets/riwayat_medis.png')} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                <Text style={{ textAlign: "center", fontFamily: fonts.primary[400], fontSize: 14, }}>Riwayat Medis</Text>
              </View>
            </TouchableWithoutFeedback>

            {/* Alarm Olahraga */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Artikel')}>
              <View >
                <Image source={require('../../assets/artikel_jantung.png')} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                <Text style={{ textAlign: "center", fontFamily: fonts.primary[400], fontSize: 14, }}>Artikel Seputar{'\n'}Jantung</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: windowHeight / 4.5, // Adjusted height for carousel item
  },
  carouselImage: {
    width: '100%',
    height: '100%', // Adjusted height for image
    // resizeMode: 'contain',
    borderRadius: 10,
  }
});
