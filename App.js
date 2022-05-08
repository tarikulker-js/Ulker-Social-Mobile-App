import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";

//Redux
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { pageNameReducer, likeReel, unLikeReel, homeRefreshing } from "./reducers/reducer";

//Redux set
import { useDispatch, useSelector } from "react-redux";

//Screens
import ActivityScreen from "./Screens/ActivityScreen";
import HomeScreen from "./Screens/HomeScreen";
import NewPostInGallery from './Screens/NewPost';
import NewReels from './Screens/NewReels';
import ProfileScreen from "./Screens/ProfileScreen";
import EditProfileScreen from "./ScreenComponents/EditProfile";
import ReelsScreen from "./Screens/ReelsScreen";
import SearchScreen from "./Screens/SearchScreen";
import Status from "./ScreenComponents/Status";
import LoginScreen from "./Screens/LoginScreen";
import LogoutScreen from "./Screens/LogoutScreen";

import LocalStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [jwt, setJwt] = React.useState(null);

  const store = createStore(
    combineReducers({ pageNameReducer, likeReel, unLikeReel, homeRefreshing })
  );

  const bottomTabScreen = () => {
    const dispatch = useDispatch();

    return (
      <>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            headerShown: false,

            tabBarIcon: ({ focused, size, colour }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
                size = focused ? size + 8 : size + 2;
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "ios-search-outline";
              } else if (route.name === "Reels") {
                iconName = focused
                  ? "caret-forward-circle"
                  : "caret-forward-circle-outline";
              } else if (route.name === "Activity") {
                iconName = focused ? "ios-heart" : "ios-heart-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-person-circle" : "ios-person-outline";
              } else if (route.name == "NewPostInGallery") {
                iconName = focused ? "add-circle-sharp" : "add-circle-outline"
              }

              return <Ionic name={iconName} size={size} color={colour} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="NewPostInGallery" component={NewPostInGallery} />
          <Tab.Screen name="Reels" component={ReelsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          
        </Tab.Navigator>
      </>
    );
  };

  useEffect(() => {
    setInterval(() => {
      LocalStorage.getItem("jwt").then((getedJwt) => {
        setJwt(getedJwt);
      });
    }, 2000);
  });

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {!jwt || jwt == "" ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <>
                <Stack.Screen name="Ulker Social" component={bottomTabScreen} />
                <Stack.Screen name="Status" component={Status} />
                <Stack.Screen name="NewReels" component={NewReels} />
                <Stack.Screen name="Logout" component={LogoutScreen} />

                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
