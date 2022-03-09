import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

const BottomTabView = () => {
  const Tab = createMaterialTopTabNavigator();

  let squares = [];
  let numberOfSquare = 7;

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const Posts = () => {
    const renderItem = ({ item }) => <Item title={item.title} />;
    
    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      </SafeAreaView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Video') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Tags') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            colour = focused ? 'black' : 'gray';
          }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Posts} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BottomTabView

/*

import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
};

*/