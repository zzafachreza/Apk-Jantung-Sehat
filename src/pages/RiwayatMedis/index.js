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

export default function RiwayatMedis({ navigation }) {
    const backPage = () => {
        navigation.goBack()
    };

    const [data, setData] = useState([]);
    const __getTransaction = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'medis', {
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
            <MyHeader onPress={backPage} judul="Riwayat Medis" />

            <View style={{ padding: 20 }}>
                <MyButton onPress={() => navigation.navigate('RiwayatTensi')} title="Tensi & Gula Darah" />
            </View>
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('MedisPdf', item)}>
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
                                    }}>{item.nama_file}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        color: colors.border
                                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                                </View>

                                <View>
                                    <Icon type='ionicon' name='search' size={24} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }} />
            </View>

            <View style={{
                flexDirection: "row", justifyContent: 'flex-end', padding: 10,
                marginBottom: 10
            }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('AddRiwayatMedis')}>
                    <View>
                        <Image source={require('../../assets/plus.png')} style={{
                            width: 70, height: 70,
                        }} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </ImageBackground >
    )
}