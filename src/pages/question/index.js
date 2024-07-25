import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyHeader, MyInput, MyRadio } from '../../components';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';

export default function JenisPenyakitJantung({ navigation, route }) {
  const [data, setData] = useState(route.params);
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    description: '',
  });
  const [otherOption, setOtherOption] = useState('');

  const [options, setOptions] = useState([
    { cek: 0, label: "Aritmia", description: "Gangguan irama jantung" },
    { cek: 0, label: "Penyakit Katup Jantung", description: "Kondisi katup pada jantung mengalami gangguan struktural atau fungsional" },
    { cek: 0, label: "Penyakit Jantung Koroner", description: "Kondisi yang disebabkan oleh penyempitan atau penyumbatan arteri koroner" },
    { cek: 0, label: "Gagal Jantung", description: "Kondisi medis ketika jantung tidak mampu memompa darah dengan efisiensi yang cukup" },
    { cek: 0, label: "Penyakit Arteri Perifer", description: "Arteri di luar jantung dan otak mengalami penyempitan atau penyumbatan" },
    { cek: 0, label: "Penyakit Jantung Bawaan", description: "Kondisi medis yang terjadi karena adanya kelainan struktural pada jantung sejak lahir" },
    { cek: 0, label: "Penyakit Perikardinal", description: "Kondisi yang mempengaruhi perikardium, yaitu lapisan tipis jaringan yang melapisi dan melindungi jantung" },
    { cek: 0, label: "Lainnya", description: "", showInput: true },
  ]);

  const handleOptionSelect = (label) => {
    setSelectedOption(label);
    if (label !== "Lainnya") {
      setOtherOption("");
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      showMessage({
        message: 'Silakan pilih jenis penyakit jantung Anda terlebih dahulu.',
        type: 'danger',
        duration: 3000,
        style: { marginTop: 40, justifyContent: 'center', alignItems: 'center' },
        titleStyle: { fontFamily: fonts.primary[600], textAlign: 'center' },
      });
      return;
    }

    let tmp = [];
    options.filter(i => i.cek > 0).map(item => {
      tmp.push(`${item.label} (${item.description})`)
    })

    navigation.navigate('GenderSelect', {
      ...data,
      jenis_penyakit: tmp.join()
    });

  };

  const backPage = () => {
    navigation.goBack()
  };

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
      <MyHeader onPress={backPage} judul="Jenis Penyakit Jantung" />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontFamily: fonts.primary[400], color: colors.primary, marginBottom: 20, textAlign: 'center' }}>
            Apakah jenis penyakit jantung Anda?
          </Text>
          {options.map((item, index) => (
            <View style={{
              marginVertical: 4,
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
              <TouchableOpacity onPress={() => {
                let tmp = [...options];
                tmp[index].cek = tmp[index].cek > 0 ? 0 : 1;
                setOptions(tmp);
              }}>
                <Icon type='ionicon' color={item.cek > 0 ? colors.success : colors.border} name={item.cek > 0 ? 'checkmark-circle' : 'ellipse'} size={30} />
              </TouchableOpacity>
              <View style={{
                flex: 1,
                paddingLeft: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>{item.label}</Text>
                {item.label == 'Lainnya' && item.cek > 0 && <MyInput nolabel onChangeText={x => {
                  let tmp = [...options];
                  tmp[index].description = x;
                  setOptions(tmp);
                }} />}
                {item.label !== 'Lainnya' &&

                  <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                    maxWidth: '95%'
                  }}>{item.description}</Text>
                }
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <MyButton title="Selanjutnya" onPress={handleNext} />
      </View>
    </ImageBackground>
  );
}
