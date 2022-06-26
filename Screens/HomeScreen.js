import * as React from "react";
import { Text, View, StatusBar, ScrollView, RefreshControl, Alert } from "react-native";
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
   
    return unsubscribe;
    
  });
  
  var [isLoading, setLoading] = React.useState('false');

  const [jwt, setJwt] = React.useState("null");
  
	const onRefresh = React.useCallback(() => {
    LocalStorage.setItem("isLoadingHomeScreen", JSON.stringify(true))
    console.log("set loading true")
    
  }, []);
  
  React.useEffect(() => {
    LocalStorage.getItem("jwt").then((jjwt) => {
      setJwt(jjwt);
    });

    setInterval(() => {
      LocalStorage.getItem("isLoadingHomeScreen").then((isLoadingHome) => {
        setLoading(isLoadingHome);
        //console.log(isLoadingHome)
  
      })
    }, 1500)
    

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
        <FontAwesome name="plus-square-o" size={36} onPress={() => {
          navigation.navigate("NewPostInGallery");
        }} />
        <Text style={{ fontSize: 25, fontWeight: "500" }}>UlkerSocial</Text>
        <Feather
          name="navigation"
          size={28}
          onPress={() => {
            navigation.navigate("Chat");
          }}
        />
      </View>

        {console.log("in render", isLoading)}
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={JSON.parse(isLoading)}
            onRefresh={onRefresh}
          />
        }>
        <Stories />
        <Post />
      </ScrollView>
    </View>
  );
}
