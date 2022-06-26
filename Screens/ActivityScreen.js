import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function ActivityScreen() {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: "setPageName", payload: "Activity" });
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World! Here is Activity Screen</Text>
      <Text>Çok Yakında Aktiviteler!</Text>
      
    </View>
  );
}