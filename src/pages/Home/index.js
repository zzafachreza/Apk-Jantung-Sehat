import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler } from 'react-native';
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

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [carouselData, setCarouselData] = useState([
    {
      id: '1',
      image: require('../../assets/carousel1.png'),
    },
    {
      id: '2',
      image: require('../../assets/carousel2.png'),
    },
  ]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const carouselRef = useRef(null);

  const _getTransaction = async () => {
    await getData('user').then(u => {
      setUser(u);
    });

    await axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    });
  }

  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => Alert.alert('Info', 'Anda mengklik gambar')}>
        <View style={styles.carouselItem}>
          <Image source={item.image} style={styles.carouselImage} />
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
          <Text style={{ color: colors.white, fontFamily: fonts.primary[300], fontSize: 20 }}>Hi Fadhlan Himawan</Text>
          <Text style={{ color: colors.white, fontFamily: fonts.primary[600], fontSize: 12 }}>Jangan Biarkan Penyakit Jantung{'\n'}Menghalangi Langkahmu. Tetap Semangat!</Text>
        </View>
        <View>
          <Image source={require('../../assets/logo.png')} style={{ width: 46, height: 71 }} />
        </View>
      </ImageBackground>

      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* DISINI BAUTKAN COROUSEL */}
          <Carousel
            ref={carouselRef}
            data={carouselData}
            renderItem={ _renderItem }
            sliderWidth={ windowWidth }
            itemWidth={ windowWidth * 0.8 }
            layout={'default'}
          />
          {/* END COROUSEL */}
        </View>

        {/* MENU */}
        <View style={{padding:10}}>

        <View style={{flexDirection:"row", justifyContent:"space-around"}}>

        {/* ALARM OBAT */}
        <TouchableWithoutFeedback onPress={() => navigation.navigate('AlarmObat')}>
          <View >
            <Image source={require('../../assets/alarm_obat.png')} style={{width:144, height:144}}/>
            <Text style={{textAlign:"center", fontFamily:fonts.primary[400], fontSize:15, }}>Alarm Obat</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Alarm Olahraga */}
        <TouchableWithoutFeedback onPress={() =>  navigation.navigate('AlaramOlahraga')}>
          <View >
            <Image source={require('../../assets/alarm_olahraga.png')} style={{width:144, height:144}}/>
            <Text style={{textAlign:"center", fontFamily:fonts.primary[400], fontSize:15, }}>Alarm Olahraga</Text>
          </View>
        </TouchableWithoutFeedback>
        </View>

    <MyGap jarak={15}/>

        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
{/* RIWAYAT MEDIS */}
<TouchableWithoutFeedback onPress={() => navigation.navigate('RiwayatMedis')}>
  <View >
    <Image source={require('../../assets/riwayat_medis.png')} style={{width:144, height:144}}/>
    <Text style={{textAlign:"center", fontFamily:fonts.primary[400], fontSize:15, }}>Riwayat Medis</Text>
  </View>
</TouchableWithoutFeedback>

{/* Alarm Olahraga */}
<TouchableWithoutFeedback onPress={() => navigation.navigate('Artikel')}>
  <View >
    <Image source={require('../../assets/artikel_jantung.png')} style={{width:144, height:144}}/>
    <Text style={{textAlign:"center", fontFamily:fonts.primary[400], fontSize:15, }}>Artikel Seputar{'\n'}Jantung</Text>
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
    height: windowHeight / 4, // Adjusted height for carousel item
  },
  carouselImage: {
    width: '100%',
    height: '100%', // Adjusted height for image
    resizeMode: 'contain',
  }
});
