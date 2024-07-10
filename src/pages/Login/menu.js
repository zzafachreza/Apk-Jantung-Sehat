import { View, Text, ImageBackground, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyGap } from '../../components'

export default function menuLogin({navigation}) {
  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex:1,
        width:'100%',
        height:'100%'
    }}>
    <View style={{padding:10,}}>

    <View style={{flexDirection:"row", justifyContent:"center", marginTop:20,
    padding:20}}>
        <Image source={require('../../assets/logo.png')}
            style={{width:407, height:407, alignItems:'center',}}
        />
    </View>


    <View style={{marginTop:28, padding:20}}>
        <Text style={{textAlign:"center", fontFamily:fonts.primary[600]}}>Halo{'\n'}
        Selamat Datang!</Text>
    </View>

    <View style={{marginTop:0, padding:20}}>
        {/* LOGIN */}
        <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
            <View style={{backgroundColor:colors.primary, borderRadius:10, padding:10}}>
                    <Text style={{color:"white", textAlign:"center", fontSize:20, fontFamily:fonts.primary[600]}}>Masuk</Text>
            </View>
        </TouchableNativeFeedback>

                <MyGap jarak={10}/>

                {/* Register */}
                <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
            <View style={{backgroundColor:colors.primary, borderRadius:10, padding:10}}>
                    <Text style={{color:"white", textAlign:"center", fontSize:20, fontFamily:fonts.primary[600]}}>Daftar</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
    
    </View>
    </ImageBackground>
  )
}