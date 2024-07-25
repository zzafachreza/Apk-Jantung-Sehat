import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginPage({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);




  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      Alert.alert(MYAPP, 'email dan Password tidak boleh kosong !');
    } else if (kirim.email == null) {
      Alert.alert(MYAPP, 'email tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);


      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }
        });



    }




  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1,
      width: '100%',
      height: '100%',
    }}>

      <ScrollView style={{ position: "relative" }}>


        <Animated.View style={{
          padding: 10,
          flex: 1, margin: 10,
          bottom: card,
          borderRadius: 0,

        }}>

          <View style={{ padding: 10, }}>


            <View style={{ marginTop: 0 }}>
              <Text style={{
                fontFamily: fonts.primary[600], textAlign: "center",
                color: colors.primary, fontSize: 32
              }}>Masuk</Text>
            </View>

            <MyGap jarak={0} />
            <View style={{ padding: 0 }}>

              <MyInput placeholder="Email" onChangeText={x => setKirim({ ...kirim, email: x })} />
              <MyInput placeholder="Password" onChangeText={x => setKirim({ ...kirim, password: x })} secureTextEntry={true} />
              {/* 
              <View style={{ padding: 10, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableWithoutFeedback>
                  <Text style={{ fontFamily: fonts.primary[300], fontSize: 15 }}>Lupa Password</Text>
                </TouchableWithoutFeedback>
              </View> */}

            </View>






          </View>






        </Animated.View>
        <View style={{ marginTop: '10%' }}>

        </View>





        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>}
      </ScrollView>

      <View style={{ padding: 20 }}>
        <MyButton onPress={masuk} title="Masuk" />
      </View>


      <View style={{ padding: 20 }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
          <View>
            <Text style={{ fontFamily: fonts.primary[400], textAlign: 'center' }}>Belum memiliki akun?<Text style={{
              color: colors.primary, fontFamily: fonts.primary[600]
            }}> Daftar</Text> </Text>
          </View>
        </TouchableNativeFeedback>
      </View>


    </ImageBackground>





  );
}

const styles = StyleSheet.create({});