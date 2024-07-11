import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, Home, Account, AccountEdit, TeknisiHome, AccountTeknisi, History, Tumbuhanmu, Quiz, TingkatSatu, NotesPage, InputNote, ResultNote, TingkatDua, Logout, LoginPage, menuLogin, Register, WelcomePage, JenisPenyakitJantung, GenderSelect, AlarmObat, AddAlarmObat, AlaramOlahraga, HistoryAlaramOlahraga, RiwayatMedis, AddRiwayatMedis, Artikel, RiwayatTensi, AddTensi } from '../pages';
import { colors } from '../utils';
import { BottomNavigator, TeknisiBottomNavigator } from '../components';
import TingkatTiga from '../pages/quiz/tingkattiga';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

        
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
   <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


<Stack.Screen
        name="GenderSelect"
        component={GenderSelect}
        options={{
          headerShown: false,
        }}
      />


<Stack.Screen
        name="RiwayatTensi"
        component={RiwayatTensi}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="AddTensi"
        component={AddTensi}
        options={{
          headerShown: false,
        }}
      />




<Stack.Screen
        name="Artikel"
        component={Artikel}
        options={{
          headerShown: false,
        }}
      />



<Stack.Screen
        name="AlaramOlahraga"
        component={AlaramOlahraga}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="RiwayatMedis"
        component={RiwayatMedis}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="AddRiwayatMedis"
        component={AddRiwayatMedis}
        options={{
          headerShown: false,
        }}
      />


<Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />

   <Stack.Screen
        name="LoginMenu"
        component={menuLogin}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JenisPenyakitJantung"
        component={JenisPenyakitJantung}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AlarmObat"
        component={AlarmObat}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddAlarmObat"
        component={AddAlarmObat}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HistoryAlaramOlahraga"
        component={HistoryAlaramOlahraga}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="QuizTingkatTiga"
        component={TingkatTiga}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notes"
        component={NotesPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InputNotes"
        component={InputNote}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ResultNotes"
        component={ResultNote}
        options={{
          headerShown: false,
        }}
      />

  
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Home"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
