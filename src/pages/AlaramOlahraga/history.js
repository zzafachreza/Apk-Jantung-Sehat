import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryAlarmOlahraga({navigation}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('riwayatOlahraga');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error fetching history', error);
      }
    };

    fetchHistory();
  }, []);


  const backPage = () => {
    navigation.goBack()
  };
  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
      <MyHeader onPress={backPage} judul='Riwayat Olahraga' />
      <ScrollView>
        <View style={styles.container}>
          {history.map((item, index) => (
            <View key={item.id || index} style={styles.historyItem}>
              <View style={styles.historyItemText}>
                <Text style={styles.historyItemTitle}>{item.namaOlahraga}</Text>
                <Text style={styles.historyItemSubtitle}>{item.tanggal} | {item.waktu} WIB</Text>
              </View>
              <Text style={styles.historyItemDuration}>{item.durasiWaktu}:00:00</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
