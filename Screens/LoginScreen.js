import * as React from "react";
import { Text, View, TextInput, Button, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocalStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Paper from 'react-native-paper'
import { API_URL } from "../config.json";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch({ type: "setPageName", payload: "Login" });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  }, [navigation]);

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  React.useEffect(() => {
    LocalStorage.getItem("jwt").then((getedJwt) => {
      console.log(getedJwt);

      if (getedJwt) {
      }
    });
  });

  const login = () => {
    console.log("logining...");

    fetch(API_URL + "/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          LocalStorage.setItem("jwt", data.token);
          LocalStorage.setItem("userid", data.user);
          alert("başarılı");
        }
      })
      .catch((err) => console.log("login post error: ", err));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, opacity: 0.75 }}>Ulker Social'a hoşgeldiniz</Text>


        <TextInput
          style={{
            borderColor: "red",
            borderRadius: 100,
            height: 40,
            width: "80%",
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
            borderColor: "red",
            borderRadius: 100,
            height: 40,
            width: "80%",
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Şifre"
          secureTextEntry={true}
        />
        <Button
          style={{
            borderColor: "red",
            borderRadius: 100,
            height: 40,
            width: "80%",
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          title="Giriş Yap"
          onPress={login}
        />

        <Paper.Button color="black" style={{
          marginTop: 30,
          fontSize: 20
        }} onPress={() => {
          navigation.navigate("Register")
        }}>Hesabınız yok mu? Kayıt olun!</Paper.Button>

        <Paper.Button color="black" style={{
          marginTop: 5,
          fontSize: 20
        }} onPress={() => {
          Linking.openURL("https://ulker-social.netlify.app/reset")
        }}>Şifremi unuttum!</Paper.Button>
        
        <Paper.Button color="black" style={{
          marginTop: 5,
          fontSize: 20
        }} onPress={() => {
          Linking.openURL("https://ulker-social.netlify.app/verify")
        }}>Hesabımı onaylamak istiyorum!</Paper.Button>
      </View>

    </View>
  );
}
