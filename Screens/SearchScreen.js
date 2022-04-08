import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SearchBox from '../ScreenComponents/SearchBox';
import DiscoverPost from '../ScreenComponents/DiscoverPost';
import Post from '../ScreenComponents/Post';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchScreen() {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: "setPageName", payload: "Search" });
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  });

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      position: 'relative'
    }}>
      <SearchBox />
      <ScrollView>
        <DiscoverPost />

      </ScrollView>

    </View>
  );
}