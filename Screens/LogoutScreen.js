import * as React from 'react';
import { Text, View } from 'react-native';
import LocalStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
  const navigation = useNavigation();

  React.useEffect(() => {
    LocalStorage.setItem("jwt", "");
    LocalStorage.setItem("userid", "");
    alert("çıkış yapıldı")
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Çıkış yapılıyor...</Text>
    </View>
  );
}