import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SearchBox from '../ScreenComponents/SearchBox';
import DiscoverPost from '../ScreenComponents/DiscoverPost';
import Post from '../ScreenComponents/Post';

export default function SearchScreen() {
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