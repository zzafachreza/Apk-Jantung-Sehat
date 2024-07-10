import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { MyGap, MyHeader } from '../../components';
import { colors, fonts } from '../../utils';

export default function AccountTeknisi({ navigation }) {
  const [profileImage, setProfileImage] = useState(require('../../assets/rudi.png')); // Gambar dummy untuk profil
  const [customerName, setCustomerName] = useState('Rudi Iryawan');
  const [username, setUsername] = useState('rudiiryawan');
  const [email, setEmail] = useState('rudiiryawan@gmail.com');
  const [phone, setPhone] = useState('0896756786545');
  const [address, setAddress] = useState('Bandung');
  const [password, setPassword] = useState('***********');
  const [confirmPassword, setConfirmPassword] = useState('***********');

  const backPage = () => {
    navigation.navigate('TeknisiMainApp');
  };

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <ImageBackground source={require('../../assets/bgimg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      {/* HEADER */}
      <MyHeader onPress={backPage} judul="Profile" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ backgroundColor: 'white', borderWidth: 0.4, borderRadius: 10 }}>
            <View style={{ padding: 10 }}>
              {/* Profile Image */}
              <TouchableOpacity onPress={selectImage} style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image source={profileImage} style={{ width: 100, height: 100, borderRadius: 50 }} />
              </TouchableOpacity>

              {/* Nama Customer */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Nama Lengkap:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi nama customer"
                  value={customerName}
                  onChangeText={setCustomerName}
                />
              </View>

              {/* Username */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Username:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              {/* Email */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Email:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Telepon */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Telepon:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi telepon"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              {/* Alamat */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Alamat:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi alamat"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              {/* Password */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Password:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Isi password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Konfirmasi Password */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.primary }}>Konfirmasi Password:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#C4C4C4',
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 10,
                  }}
                  placeholder="Konfirmasi password"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              {/* Tombol Edit Profil */}
              <TouchableOpacity
                style={{
                  backgroundColor: 'grey',
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => {
                  // Action ketika tombol Edit Profil ditekan
                  console.log('Edit Profil ditekan');
                }}
              >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: fonts.primary[600] }}>
                  Edit Profil
                </Text>
              </TouchableOpacity>

              {/* Tombol Logout */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => {
                  // Action ketika tombol Logout ditekan
                  console.log('Logout ditekan');
                }}
              >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: fonts.primary[600] }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
