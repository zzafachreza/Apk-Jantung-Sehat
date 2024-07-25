import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'
import moment from 'moment'

export default function RiwayatTensi({ navigation }) {
    const backPage = () => {
        navigation.goBack()
    };


    const [data, setData] = useState([]);
    const __getTransaction = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'tensi', {
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
            <MyHeader onPress={backPage} judul="Riwayat" />

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
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/tensi.png')} style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain'
                                }} />
                                <Text style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.primary
                                }}>{item.sistole}/{item.diastole} mmHg</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                    color: item.hasil_tensi == 'Normal' ? colors.success : colors.danger
                                }}>{item.hasil_tensi}</Text>
                            </View>
                            <View style={{
                                marginTop: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/gula.png')} style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain'
                                }} />
                                <Text style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.primary
                                }}>{item.gula} mg/dL</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                    color: item.hasil_gula == 'Normal' ? colors.success : colors.danger
                                }}>{item.hasil_gula}</Text>
                            </View>
                            <Text style={{
                                marginTop: 5,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                color: colors.border
                            }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                        </View>

                    )
                }} />
            </View>

            <View style={{
                flexDirection: "row", justifyContent: 'flex-end', padding: 10,
                marginBottom: 10
            }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('AddTensi')}>
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