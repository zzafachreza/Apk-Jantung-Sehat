import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyHeader, MyRadio } from '../../components';
import { colors, fonts } from '../../utils';

export default function JenisPenyakitJantung({ navigation, route }) {
  const [data, setData] = useState(route.params);
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    description: '',
  });
  const [otherOption, setOtherOption] = useState('');

  const [options, setOptions] = useState([
    { label: "Aritmitia", description: "Gangguan irama jantung" },
    { label: "Penyakit Katup Jantung", description: "Kondisi katup pada jantung mengalami gangguan struktural atau fungsional" },
    { label: "Penyakit Jantung Koroner", description: "Kondisi yang disebabkan oleh penyempitan atau penyumbatan arteri koroner" },
    { label: "Gagal Jantung", description: "Kondisi medis ketika jantung tidak mampu memompa darah dengan efisiensi yang cukup" },
    { label: "Penyakit Arteri Perifer", description: "Arteri di luar jantung dan otak mengalami penyempitan atau penyumbatan" },
    { label: "Penyakit Jantung Bawaan", description: "Kondisi medis yang terjadi karena adanya kelainan struktural pada jantung sejak lahir" },
    { label: "Penyakit Perikardinal", description: "Kondisi yang mempengaruhi perikardium, yaitu lapisan tipis jaringan yang melapisi dan melindungi jantung" },
    { label: "Lainnya", description: "", showInput: true },
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
    navigation.navigate('GenderSelect', data);

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
          {options.map((option, index) => (
            <MyRadio
              key={index}
              label={option.label}
              description={option.description}
              selected={selectedOption.label === option.label}
              onPress={() => {
                handleOptionSelect(option);

                setData({
                  ...data,
                  jenis_penyakit: `${option.label} ( ${option.description} )`
                })
              }
              }
              showInput={option.showInput}
              onInputChange={(text) => {
                setOtherOption(text);
                let tmp = [...options];
                tmp[index].description = text;
                setOptions(tmp);
                setData({
                  ...data,
                  jenis_penyakit: `${option.label} ( ${text} )`
                })
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <MyButton title="Selanjutnya" onPress={handleNext} />
      </View>
    </ImageBackground>
  );
}
