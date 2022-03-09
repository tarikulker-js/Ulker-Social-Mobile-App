import * as React from 'react';
import { Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function SearchBox() {
  return (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%',
        position: 'relative'
    }}>
      <Ionic name="search" style={{
          fontSize: 10,
          opacity: 0.6,
          position: 'absolute',
          zIndex: 1,
          left: 25
      }} />
      <TextInput 
        onPress={() => alert("Çok Yakında!")}
        onChangeText={() => alert("Çok Yakında aktifleştirilecektir!")}
        placeholder='Kullanıcı Ara (Aktif değildir, Çok Yakında aktifleştirilecektir!)'
        placeholderTextColor='#909090'
        style={{
            width: '94%',
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: 15,
            padding: 4,
            paddingLeft: 40
        }}
      />
    </View>
  );
}