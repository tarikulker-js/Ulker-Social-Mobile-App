import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocalStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config.json'
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  React.useEffect(() => {
    LocalStorage.getItem("jwt").then((getedJwt) => {
      console.log(getedJwt);

      if (getedJwt) {

      }
    })
  })

  const login = () => {
    console.log("logining...");

    fetch(API_URL + '/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        alert("başarılı");

        if (data.error) {
          alert(data.error)
        } else {
          LocalStorage.setItem("jwt", data.token);
          LocalStorage.setItem("userid", data.user);

          navigation.navigate("Ulker Social");
        

        }
      }).catch((err) => console.log("login post error: ", err));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World! Here is Login Screen</Text>
      <TextInput
        style={{
          borderColor: 'red',
          borderRadius: 100,
          height: 40,
          width: '80%',
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="E-Mail"
        keyboardType="email-address"
      />
      <TextInput
        style={{
          borderColor: 'red',
          borderRadius: 100,
          height: 40,
          width: '80%',
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Şifre"
        keyboardType="password"
      />
      <Button
        style={{
          borderColor: 'red',
          borderRadius: 100,
          height: 40,
          width: '80%',
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        title="Giriş Yap" onPress={login} />
    </View>
  );
}