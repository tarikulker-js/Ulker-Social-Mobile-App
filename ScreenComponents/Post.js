import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { API_URL } from '../config.json';
import LocalStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from 'react-native-loading-spinner-overlay';


export default function Post() {
    const [posts, setPosts] = useState(null);
    const [userid, setUserId] = useState();
    const [jwt, setJwt] = useState(null);
    const [comment, onChangeComment] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const updateInfos = () => {
        setLoading(true);

        LocalStorage.getItem("jwt").then((getedJwt) => {
            console.log(getedJwt);

            LocalStorage.getItem("userid").then((getedUserId) => {
                console.log(getedUserId);
                setUserId(getedUserId);

            });

            fetch(`${API_URL}/getsubpost`, {
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + getedJwt
                }
            }).then(res => res.json())
                .then(result => {
                    //console.log("POSTS: ", result.posts);
                    setPosts(result.posts);
                    setLoading(false);
                    console.log("updated. ");

                }).catch(err => {
                    console.log(err)
                })

        });

    }

    useEffect(() => {
        setLoading(true);
        LocalStorage.getItem("jwt").then((getedJwt) => {
            console.log(getedJwt);

            LocalStorage.getItem("userid").then((getedUserId) => {
                console.log(getedUserId);
                setUserId(getedUserId);

            });

            fetch(`${API_URL}/getsubpost`, {
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + getedJwt
                }
            }).then(res => res.json())
                .then(result => {
                    //console.log("POSTS: ", result);
                    setPosts(result.posts);
                    setLoading(false);
                    console.log("loaded");

                }).catch(err => {
                    console.log(err)
                })

        });

    }, [])

    useEffect(() => {
        LocalStorage.getItem("jwt").then((getedJwt) => {
            setJwt(getedJwt);

        })
    })

    const likePost = (id) => {
        setLoading(true);
        fetch(`${API_URL}/like`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log("result", result);

                updateInfos();

            }).catch(err => {
                //console.log(err)
            })
    }

    const unlikePost = (id) => {
        setLoading(true);
        fetch(`${API_URL}/unlike`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {

                updateInfos();

            }).catch(err => {
                //console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        if (text === "" || text == null) {
            alert("boş yorum gönderilemez. ");

        } else if (text.length > 0) {
            setLoading(true);
            fetch(`${API_URL}/comment`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                body: JSON.stringify({
                    postId: postId,
                    text: text
                })
            }).then(res => res.json())
                .then(result => {
                    console.log(result)

                    alert("yorum yapıldı.");
                    onChangeComment("");
                    updateInfos();

                })
                .catch(err => {
                    //console.log(err)
                })
        }

    }

    const deletePost = (postId) => {
        //${API_URL}
        setLoading(true);

        fetch(`${API_URL}/deletepost/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                //console.log(result);

                if (result.message) {
                    alert(result.message);

                }

            })

    }

    return (
        <>
            <Loading visible={isLoading} />
            <View>
                {posts == null ? <></> : posts.map(data => {
                    return (
                        <View
                            key={data._id}
                            style={{
                                paddingBottom: 10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.1,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 15,
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: data.postedBy.pic }}
                                        style={{ width: 40, height: 40, borderRadius: 100 }}
                                    />
                                    <View style={{ paddingLeft: 5 }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            {data.postedBy.name}
                                        </Text>
                                    </View>
                                </View>
                                {/*<Feather name="delete-vertical" style={{ fontSize: 20 }} />*/}
                            </View>
                            <View
                                style={{
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={{ uri: data.picture }}
                                    style={{ width: '100%', height: 400 }}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    paddingVertical: 15,
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        {
                                            data.likes.includes(userid) ?
                                                <AntDesign
                                                    onPress={() => unlikePost(data._id)}
                                                    name='heart'
                                                    style={{
                                                        paddingRight: 10,
                                                        fontSize: 20,
                                                        color: 'red',
                                                    }}
                                                    color="red"
                                                /> :
                                                <AntDesign
                                                    onPress={() => likePost(data._id)}
                                                    name='hearto'
                                                    style={{
                                                        paddingRight: 10,
                                                        fontSize: 20,
                                                        color: 'black',
                                                    }}
                                                    color="black"
                                                />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <Feather name="bookmark" style={{ fontSize: 20 }} onPress={() => alert("Çok Yakında!")} />
                            </View>

                            <View style={{ paddingHorizontal: 15 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                    {data.title}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                    {data.body}
                                </Text>
                                <Text>
                                    {data.likes.length} Beğeni
                                </Text>

                                {
                                    data.comments.map(comment => {
                                        return (
                                            <View key={comment._id}>
                                                <Text
                                                    style={{
                                                        fontWeight: '700',
                                                        fontSize: 14,
                                                        paddingVertical: 2,
                                                    }}>
                                                    {comment.postedBy.name}: {comment.text}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={{ uri: data.postedBy.pic }}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                borderRadius: 100,
                                                backgroundColor: 'orange',
                                                marginRight: 10,
                                            }}
                                        />
                                        <TextInput
                                            placeholder="Yorum ekleyin "
                                            style={{ opacity: 0.5 }}
                                            keyboardType="submit"
                                            onChangeText={onChangeComment}
                                            value={comment}
                                        />
                                    </View>
                                    <Button
                                        title="Gönder"
                                        onPress={ () => makeComment(comment, data._id) }
                                    />
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </>
    
    )
}