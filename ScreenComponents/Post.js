import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { API_URL } from "../config.json";
import LocalStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loading from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";

export default function Post() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);
  const [userid, setUserId] = useState();
  const [jwt, setJwt] = useState(null);
  const [comment, onChangeComment] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const updateInfos = () => {
    //console.log("called update")
    setLoading(true);

    LocalStorage.getItem("jwt").then((getedJwt) => {
      //console.log(getedJwt);

      LocalStorage.getItem("userid").then((getedUserId) => {
        //console.log(getedUserId);
        setUserId(getedUserId);
      });

      fetch(`${API_URL}/getsubpost`, {
        type: "POST",
        headers: {
          Authorization: "Bearer " + getedJwt,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          //console.log("POSTS: ", result.posts);
          setPosts(result.posts);
          setLoading(false);
          //console.log("false 50 post.js")
          LocalStorage.setItem("isLoadingHomeScreen", JSON.stringify(false))
          //console.log("updated. ");
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  };

  useEffect(() => {
    setLoading(true);
    LocalStorage.getItem("jwt").then((getedJwt) => {
      //console.log(getedJwt);

      LocalStorage.getItem("userid").then((getedUserId) => {
        //console.log(getedUserId);
        setUserId(getedUserId);
      });

      fetch(`${API_URL}/getsubpost`, {
        type: "POST",
        headers: {
          Authorization: "Bearer " + getedJwt,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          //console.log("POSTS: ", result);
          setPosts(result.posts);
          setLoading(false);
          //console.log("false 80 post.js")
          LocalStorage.setItem("isLoadingHomeScreen", JSON.stringify(false))
          //console.log("loaded");
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  }, []);

  useEffect(() => {
    LocalStorage.getItem("jwt").then((getedJwt) => {
      setJwt(getedJwt);
    });

    setInterval(() => {
      LocalStorage.getItem("isLoadingHomeScreen").then((isLoadingHome) => {
        if(isLoadingHome == 'true' || isLoadingHome == true){
          updateInfos();

        }
      })
    }, 1500)
  });

  const likePost = (id) => {
    setLoading(true);
    fetch(`${API_URL}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log("result", result);

        updateInfos();
      })
      .catch((err) => {
        //console.log(err)
      });
  };

  const unlikePost = (id) => {
    setLoading(true);
    fetch(`${API_URL}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        updateInfos();
      })
      .catch((err) => {
        //console.log(err)
      });
  };

  const makeComment = (text, postId) => {
    if (text === "" || text == null) {
      alert("boş yorum gönderilemez. ");
    } else if (text.length > 0) {
      setLoading(true);
      fetch(`${API_URL}/comment`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          postId: postId,
          text: text,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          //console.log(result);

          alert("yorum yapıldı.");
          onChangeComment("");
          updateInfos();
        })
        .catch((err) => {
          //console.log(err)
        });
    }
  };

  const deletePost = (postId) => {
    //${API_URL}
    setLoading(true);

    fetch(`${API_URL}/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        
        if (result.message) {
          alert(result.message);

        }
      });
  };

  return (
    <>
      <Loading visible={isLoading} />
      
      <View>
        {posts == null ? (
          <><Text style={{ fontSize: 30, textAlign: 'center', alignItems: 'center'}}>Yükleniyor...</Text></>
        ) : (
          posts.length == 0 ? <><Text style={{ fontSize: 30, textAlign: 'center', alignItems: 'center'}}>Takip ettikleriniz profillerin hiç gönderisi yok. </Text></> : 
          posts.map((data) => {
            return (
              <View
                key={data._id}
                style={{
                  paddingBottom: 10,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 15,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: data.postedBy.pic }}
                      style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                    <View style={{ paddingLeft: 5 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {data.postedBy.name}
                      </Text>
                    </View>

                  </View>
                    <View style={{ paddingRight: 5, float: 'right' }}>
                      <MaterialIcons name="delete-outline" size={25} onPress={() => { deletePost(data._id) }} />
                    </View>
                </View>
                <View
                  style={{
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: data.picture }}
                    style={{ width: "100%", height: 400 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity>
                      {data.likes.includes(userid) ? (
                        <AntDesign
                          onPress={() => unlikePost(data._id)}
                          name="heart"
                          style={{
                            paddingRight: 10,
                            fontSize: 20,
                            color: "red",
                          }}
                          color="red"
                        />
                      ) : (
                        <AntDesign
                          onPress={() => likePost(data._id)}
                          name="hearto"
                          style={{
                            paddingRight: 10,
                            fontSize: 20,
                            color: "black",
                          }}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <FontAwesome
                    name={
                      data.savedUsers ? data.savedUsers.includes(userid)
                        ? "bookmark"
                        : "bookmark-o" : "bookmark-o"
                    }
                    style={{ fontSize: 30 }}
                    onPress={() => {
                      Alert.alert("Çok Yakında!")
                      //console.log(userid);
                      //console.log("kaydediliyor...");
                      /*fetch(`${API_URL}/savepost`, {
                        method: "PUT",
                        headers: {
                          "Authorization": "Bearer " + jwt
                        },
                        body: JSON.stringify({
                          postId: data.id
                        }),
                      }).then(res => res.json())
                      .then(result => {
                        //console.log(result);
                        updateInfos();
                        
                      })*/
                      
                    }}
                  />
                </View>

                <View style={{ paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {data.title}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {data.body}
                  </Text>
                  <Text>{data.likes.length} Beğeni</Text>

                  {data.comments.map((comment) => {
                    return (
                      <View key={comment._id}>
                        <Text
                          style={{
                            fontWeight: "700",
                            fontSize: 14,
                            paddingVertical: 2,
                          }}
                        >
                          {comment.postedBy.name}: {comment.text}
                        </Text>
                      </View>
                    );
                  })}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={{ uri: data.postedBy.pic }}
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
                      onPress={() => makeComment(comment, data._id)}
                    />
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </>
  );
}
