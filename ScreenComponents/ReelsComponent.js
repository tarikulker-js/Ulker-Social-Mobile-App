import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SingleReel from './SingleReel';

const videoData = [
  {
    //video: require('../storage/videos/video1.mp4'),
    video: "http://techslides.com/demos/sample-videos/small.mp4",
    postProfile: require('../storage/images/post1.jpg'),
    title: 'Ram_Charan',
    description: 'Feel the buity of nature',
    likes: '245k',
    isLike: false,
  },
  {
    //video: require('../storage/videos/video2.mp4'),
    video: "https://res.cloudinary.com/social-tut/video/upload/v1618599062/samples/sea-turtle.mp4",
    postProfile: require('../storage/images/post2.jpg'),
    title: 'The_Groot',
    description: "It's a tea time",
    likes: '656k',
    isLike: false,
  },
];

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      renderItem={({ item, index }) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;
