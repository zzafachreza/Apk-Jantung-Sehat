import { View, Text, ImageBackground, ScrollView, TouchableWithoutFeedback, Image, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MyButton, MyHeader, MyInput, MyPicker } from '../../components';
import { colors, fonts, MyDimensi, windowWidth } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import SoundPlayer from 'react-native-sound-player'
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
export default function StopwatchPage({ navigation, route }) {
    const [data, setData] = useState([])
    const [item, setItem] = useState({
        ...route.params,
        tanggal: moment().format('dddd, DD MMMM YYYY'),
        jam: moment().format('HH:mm:ss')
    });
    console.log(item)
    const backPage = () => {
        navigation.goBack();
    };

    const [stop, setStop] = useState(true)
    const [real, setReal] = useState('');

    const stopwatchRef = useRef();

    useEffect(() => {
        getData('olahraga').then(res => {
            if (!res) {
                setData([]);
            } else {
                setData(res)
            }
        })
    }, [])
    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={{
            flex: 1
        }}>
            <MyHeader onPress={backPage} judul='Alarm Olahraga' />


            <View style={{
                flex: 1,
                // backgroundColor: 'red'
                padding: 16,
            }}>
                <Text style={{
                    marginTop: '10%',
                    fontFamily: fonts.secondary[800],
                    fontSize: 30,
                    textAlign: 'center',
                    color: colors.primary
                }}>{item.nama_olahraga}</Text>
                <View style={{
                    padding: 10,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Stopwatch laps={false} start={stop}
                        // options={options}
                        // stop={stop}

                        options={{
                            container: {
                            },
                            text: {
                                fontSize: MyDimensi / 0.8,
                                textAlign: 'center',
                                color: colors.primary,
                                fontFamily: fonts.secondary[600],

                            }
                        }}

                        getMsecs={x => {
                            // console.log(x);
                            // setReal(x);
                            if (x >= item.durasi) {

                                setStop(false);
                                SoundPlayer.playSoundFile('olahraga', 'mp3');


                            }

                        }}
                        getTime={x => {
                            // console.log(x);
                            setReal(x)
                        }}
                    />


                </View>

                <View style={{
                    padding: 10,
                }}>
                    <MyButton title="Selesai" onPress={async () => {

                        setStop(false);
                        let sendData = await {};


                        sendData = {
                            ...item,
                            real: real.toString()
                        }


                        let tmp = [...data];
                        tmp.push(sendData);

                        // setData(tmp);
                        storeData('olahraga', tmp)
                        console.log(tmp);
                        navigation.replace('HistoryAlaramOlahraga')


                    }} />
                </View>
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    stopWatchContainer: {
        paddingVertical: 16,
        paddingHorizontal: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 24,
    },
    stopWatchChar: {
        fontSize: 48,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: colors.black,
    },
})