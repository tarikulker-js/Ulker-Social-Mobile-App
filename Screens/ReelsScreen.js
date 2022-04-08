import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from '../ScreenComponents/ReelsComponent';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const pageName = useSelector(state => {
    return state.pageNameReducer;
    //console.log(state.videogIdReducer);
    
  })
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    console.log("page name", pageName);
    
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("REELS")
      dispatch({ type: "setPageName", payload: "Reels" });
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  });

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