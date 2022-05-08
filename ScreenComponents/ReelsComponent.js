import React, { useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import SingleReel from "./SingleReel";
import LocalStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config.json";
import { useSelector, useDispatch } from "react-redux";

/*const videoData = [
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
];*/

const ReelsComponent = () => {
  const [videoData, setVideoData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userId, setUserId] = useState("");
  const [jwt, setJwt] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const dispatch = useDispatch();
  const likeReel = useSelector((state) => {
    return state.likeReel;
    //console.log(state.videogIdReducer);
  });

  const unLikeReel = useSelector((state) => {
    return state.unLikeReel;
    //console.log(state.videogIdReducer);
  });

  const updateInfos = () => {
    LocalStorage.getItem("userid").then((userid) => {
      setUserId(userid);

      LocalStorage.getItem("jwt").then((jjwt) => {
        setJwt(jjwt);
        fetch(`${API_URL}/allreels`, {
          type: "POST",
          headers: {
            Authorization: "Bearer " + jjwt,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setRefreshing(false);
            dispatch({ type: "setLikeReel", payload: null });
            dispatch({ type: "setUnLikeReel", payload: null });

            setVideoData(result.reels);
            console.log(result.reels);
            console.log("updated. ");
          })
          .catch((err) => {
            //console.log(err)
          });
      });
    });
  };

  const onRefresh = () => {
    setRefreshing(true);

    updateInfos();
  };

  useEffect(() => {
    if (likeReel == null) {
    } else {
      console.log("LIKEREEL", likeReel);

      fetch(`${API_URL}/reel/like`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          postId: likeReel,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("like result", result);
          updateInfos();
        })
        .catch((err) => {
          //console.log(err)
        });
    }

    if (unLikeReel == null) {
    } else {
      console.log("UNLIKEREEL", unLikeReel);

      fetch(`${API_URL}/reel/unlike`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          postId: unLikeReel,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("unlike result", result);
          updateInfos();
        })
        .catch((err) => {
          //console.log(err)
        });
    }
  });

  useEffect(() => {
    LocalStorage.getItem("userid").then((userid) => {
      setUserId(userid);

      LocalStorage.getItem("jwt").then((jjwt) => {
        setJwt(jjwt);
        fetch(`${API_URL}/allreels`, {
          type: "POST",
          headers: {
            Authorization: "Bearer " + jjwt,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setVideoData(result.reels);
          })
          .catch((err) => {
            //console.log(err)
          });
      });
    });
  }, []);

  return (
    <>
      {videoData == null && userId == null ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <SwiperFlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          vertical={true}
          onChangeIndex={handleChangeIndexValue}
          data={videoData}
          renderItem={({ item, index }) => (
            <SingleReel
              userId={userId}
              item={item}
              index={index}
              currentIndex={currentIndex}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      )}
    </>
  );
};

export default ReelsComponent;
