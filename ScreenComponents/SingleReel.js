import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Video } from "expo-av";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import LocalStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config.json";

/* BURASI  */
import { useIsFocused } from "@react-navigation/native";

const SingleReel = ({ userId, item, index, currentIndex }) => {
  const pageName = useSelector((state) => {
    return state.pageNameReducer;
    //console.log(state.videogIdReducer);
  });
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log("buffring", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(false);
  const [comment, onChangeComment] = useState(null);
  const [like, setLike] = useState(item.likes.includes(userId));

  /* BURASI  */
  const screenIsFocused = useIsFocused();

  /* BURASI  */
  useEffect(() => {
    if (!screenIsFocused) videoRef?.current?.pauseAsync();
    else videoRef?.current?.playAsync();
  }, [videoRef, screenIsFocused]);

  useEffect(() => {
    if (screenIsFocused && currentIndex == index) {
      videoRef?.current?.playAsync();
    } else {
      videoRef?.current?.pauseAsync();
    }
  });

  const likeReel = () => {
    setLike(!like);
    console.log(item._id);
    console.log("item");
    dispatch({ type: "setLikeReel", payload: item._id });
  };

  const unLikeReel = () => {
    setLike(!like);
    dispatch({ type: "setUnLikeReel", payload: item._id });
  };

  const makeComment = (text, postId) => {
    if (text === "" || text == null) {
      alert("boş yorum gönderilemez. ");
    } else if (text.length > 0) {
      LocalStorage.getItem("jwt").then((jwt) => {
        fetch(`${API_URL}/reel/comment`, {
          method: "put",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reelId: postId,
            text: text,
          }),
        })
          .then((res) => res.text())
          .then((result) => {
            console.log(result)
//            setModalVisible(!modalVisible);
            alert("yorum yapıldı.");
            onChangeComment("");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  return (
    <>
      {/* Modal */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
              height: windowHeight,
              width: windowWidth,
            }}
          >
            <View
              style={{
                height: windowHeight,
                width: windowWidth,
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Pressable
                style={[
                  {
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    position: "absolute",
                    left: 30,
                    top: 15,
                  },
                  {
                    backgroundColor: "#2196F3",
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialIcons name="arrow-back" size={24} />
              </Pressable>
              <View
                style={{
                  position: "absolute",
                  top: 80,
                  width: windowWidth - 25,
                  height: windowHeight - 175,
                }}
              >
                {item.comments.length == 0 ? (
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: "center",
                    }}
                  >
                    Yorum yok. İlk yorumu yapan sen ol!
                  </Text>
                ) : (
                  <>
                    <ScrollView>
                      {item.comments.map((comment) => {
                        console.log("maped comment", comment);

                        return (
                          <>
                            <View
                              style={{
                                width: windowWidth,
                                height: 40,
                              }}
                            >
                              <View style={{ paddingHorizontal: 15 }}>
                                <View key={comment._id}>
                                  <Text
                                    style={{
                                      fontWeight: "700",
                                      fontSize: 14,
                                      paddingVertical: 2,
                                      marginTop: 7,
                                    }}
                                  >
                                    {comment.postedBy.name}: {comment.text}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </>
                        );
                      })}
                    </ScrollView>
                  </>
                )}
              </View>
              <View
                style={{
                  width: windowWidth - 25,
                  position: "absolute",
                  bottom: 50,
                }}
              >
                <Text></Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.postedBy.pic }}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                        backgroundColor: "orange",
                        marginRight: 10,
                      }}
                    />
                    <TextInput
                      placeholder="Yorum ekleyin "
                      style={{ opacity: 0.5 }}
                      onChangeText={onChangeComment}
                      value={comment}
                    />
                  </View>
                  <Button
                    title="Gönder"
                    onPress={() => makeComment(comment, item._id)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          width: windowWidth,
          height: windowHeight - 20,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setMute(!mute)}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <Video
            ref={videoRef}
            isBuffering={onBuffer}
            onError={onError}
            isLooping={true}
            resizeMode="cover"
            isPlaying={screenIsFocused && currentIndex == index ? true : false}
            source={{ uri: item.video }}
            isMuted={mute}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        </TouchableOpacity>
        <Ionic
          name="volume-mute"
          style={{
            fontSize: mute ? 20 : 0,
            color: "white",
            position: "absolute",
            backgroundColor: "rgba(52,52,52,0.6)",
            borderRadius: 100,
            padding: mute ? 20 : 0,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: windowWidth,
            zIndex: 1,
            bottom: 0, //edited
            padding: 10,
          }}
        >
          <View style={{}}>
            <TouchableOpacity style={{ width: 150 }}>
              <View
                style={{
                  width: 100,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 100,
                    backgroundColor: "white",
                    margin: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.postedBy.pic }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                      borderRadius: 100,
                    }}
                  />
                </View>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.postedBy.name}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{ color: "white", fontSize: 14, marginHorizontal: 10 }}
            >
              {item.description}
            </Text>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Ionic
                name="ios-musical-note"
                style={{ color: "white", fontSize: 16 }}
              />
              <Text style={{ color: "white" }}>Original Audio</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10, //edited
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => setLike(!like)}
            style={{ padding: 10 }}
          >
            <AntDesign
              onPress={like ? unLikeReel : likeReel}
              name={like ? "heart" : "hearto"}
              style={{ color: like ? "red" : "white", fontSize: 25 }}
            />
            <Text style={{ color: "white" }}>{item.likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              videoRef?.current?.playAsync();
              //				setModalVisible(!modalVisible)
            }}
          >
            <Ionic
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              name="ios-chatbubble-outline"
              style={{ color: "white", fontSize: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Ionic
              onPress={() => Alert.alert("Çok Yakında!")}
              name="paper-plane-outline"
              style={{ color: "white", fontSize: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Feather
              onPress={() => Alert.alert("Çok Yakında!")}
              name="more-vertical"
              style={{ color: "white", fontSize: 25 }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              margin: 10,
            }}
          >
            <Image
              source={item.postProfile}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default SingleReel;
