import * as React from 'react';
import { Text, View } from 'react-native';
import LocalStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function LogoutScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: "setPageName", payload: "Logout" });
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  });


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