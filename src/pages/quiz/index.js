import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { MyGap, MyHeader } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

import { colors, fonts } from '../../utils';


export default function Quiz({ navigation }) {
    const backPage = () => {
        navigation.goBack()
    };


    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <MyHeader judul="Yuk Coba Quiz Menarik!" onPress={backPage}/>
            <View style={{padding:10, }}>

            {/* TINGKAT 1 */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('QuizTingkatPertama')}>
                <View style={{padding:10, backgroundColor:colors.white, borderWidth:2, borderRadius:10, 
                borderColor:'#dedede', flexDirection:"row", justifyContent:"center"}}>


                        <View style={{padding:10, justifyContent:"center"}}>
                            <Image style={{
                                width:44, height:44, 
                            }} source={require('../../assets/one.png')}/>
                        </View>

                        <View style={{padding:10, justifyContent:"center"}}>
                            <Text style={{fontFamily:fonts.primary[600], fontSize:32, color:colors.primary}}>TINGKAT 1</Text>
                        </View>

                </View>
            </TouchableWithoutFeedback>

            <MyGap jarak={20}/>

  {/* TINGKAT 2 */}
  <TouchableWithoutFeedback onPress={() => navigation.navigate('QuizTingkatKedua')}>
                <View style={{padding:10, backgroundColor:colors.white, borderWidth:2, borderRadius:10, 
                borderColor:'#dedede', flexDirection:"row", justifyContent:"center"}}>


                        <View style={{padding:10, justifyContent:"center"}}>
                            <Image style={{
                                width:44, height:44, 
                            }} source={require('../../assets/two.png')}/>
                        </View>

                        <View style={{padding:10, justifyContent:"center"}}>
                            <Text style={{fontFamily:fonts.primary[600], fontSize:32, color:colors.primary}}>TINGKAT 2</Text>
                        </View>

                </View>
            </TouchableWithoutFeedback>

                            <MyGap jarak={20}/>
  {/* TINGKAT 3 */}
  <TouchableWithoutFeedback onPress={() => navigation.navigate('QuizTingkatTiga')}>
                <View style={{padding:10, backgroundColor:colors.white, borderWidth:2, borderRadius:10, 
                borderColor:'#dedede', flexDirection:"row", justifyContent:"center"}}>


                        <View style={{padding:10, justifyContent:"center"}}>
                            <Image style={{
                                width:44, height:44, 
                            }} source={require('../../assets/tree.png')}/>
                        </View>

                        <View style={{padding:10, justifyContent:"center"}}>
                            <Text style={{fontFamily:fonts.primary[600], fontSize:32, color:colors.primary}}>TINGKAT 3</Text>
                        </View>

                </View>
            </TouchableWithoutFeedback>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
   
});
