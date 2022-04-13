import * as React from "react";
import { Text, View, StatusBar, ScrollView, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Stories from "../ScreenComponents/Stories";
import Post from "../ScreenComponents/Post";
import LocalStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch({ type: "setPageName", payload: "Home" });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  });

  const [jwt, setJwt] = React.useState("null");

  React.useEffect(() => {
    LocalStorage.getItem("jwt").then((jjwt) => {
      setJwt(jjwt);
    });
  });

  return (
    <View>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          marginTop: 17.5,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />
        <Text style={{ fontSize: 25, fontWeight: "500" }}>UlkerSocial</Text>
        <Feather
          name="navigation"
          stlye={{ fontSize: 35 }}
          onPress={() => {}}
        />
      </View>

      <ScrollView>
        <Stories />
        <Post />
      </ScrollView>
    </View>
  );
}
