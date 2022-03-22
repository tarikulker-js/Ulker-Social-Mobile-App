import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from '../ScreenComponents/ReelsComponent';

const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const pageName = useSelector(state => {
    return state.pageNameReducer;
    //console.log(state.videogIdReducer);

  })

  React.useEffect(() => {
    setInterval(() => {
      console.log(pageName);
    
    }, 500)
  })

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Reels
        </Text>
        <Feather name="camera" style={{fontSize: 25, color: 'white'}} />
      </View>
      <ReelsComponent />
    </View>
  );
};

export default Reels;