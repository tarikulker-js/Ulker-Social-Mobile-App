import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, ScrollView, Image } from 'react-native';

import { ProfileBody, ProfileButtons } from '../ScreenComponents/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '../ScreenComponents/BottomTabView';
import LocalStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config.json'
import axios from 'axios';

const Profile = () => {
  let circuls = [];
  let numberofcircels = 10;

  const [user, setUser] = React.useState("");
  const [userProfile, setUserProfile] = React.useState({
    email: null,
    followers: [],
    following: [],
    name: null,
    password: null,
    pic: null,
    _id: null
  })
  const [profilePic, setProfilePic] = React.useState("");
  const [image, setImage] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [mypics, setPics] = React.useState([]);
  const [jwt, setJwt] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [myId, setMyId] = React.useState(true);
  

  const [itemmm, setItem] = React.useState("no edited.")

  React.useEffect(() => {
    setLoading(true);

    LocalStorage.getItem("userid").then((getedMyId) => {
      setMyId(getedMyId);
      
      LocalStorage.getItem("jwt").then((getedJwt) => {
        setJwt(getedJwt);
  
        fetch(`${API_URL}/mypost`, {
          type: "POST",
          headers: {
            "Authorization": "Bearer " + getedJwt
          }
        }).then(res => res.json())
          .then(result => {
            console.log("pics", result);
            setPics(result.myPosts);
  
            fetch(`${API_URL}/profile`, {
              type: "POST",
              headers: {
                "Authorization": "Bearer " + getedJwt
              }
            }).then(res => res.json())
              .then(result => {
                console.log("profile", result)
                setUser(result.user);
                setUserProfile(result.user)
                setProfilePic(result.user.pic);
  
                setLoading(false);
  
              })
              .catch(err => {
                console.log("/profile error: ", err)
              })
  
          })
          .catch(err => {
            console.log("/mypost error: ", err)
          })
  
  
      })

    });


  }, []);

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="plus" style={{ fontSize: 40, color: 'black' }} />
          </View>
        ) : (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: 'black',
                opacity: 0.1,
                marginHorizontal: 5,
              }}>
            </View>
          )}
      </View>,
    );
  }

  const renderImages = (item) => {
    return (
      <View key={item.item._id} style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={{ uri: item.item.picture }}
          style={{
            height: 100,
            width: 100
          }}
        />
      </View>
    )
  }

  return (
    <>
    {console.log("myId in profileScreen", myId)}

      {
        isLoading == false && myId !== null ?
          <>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
              <View style={{ width: '100%', padding: 10 }}>
                <ProfileBody
                  name={user.name}
                  accountName={user.name}
                  profileImage={{ uri: profilePic }}
                  followers={userProfile.followers.length}
                  following={userProfile.following.length}
                  post={mypics.length}
                  user={user}
                />
                <ProfileButtons
                  user={user}
                  userProfile={userProfile}
                  profilePic={profilePic}
                  mypics={mypics}
                  myid={myId}
                />
              </View>
              <View>
                <Text
                  style={{
                    padding: 10,
                    letterSpacing: 1,
                    fontSize: 14,
                  }}>
                  Öne Çıkan Hikayeler (Çok Yakında!)
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  {circuls}
                </ScrollView>
              </View>
              {/* GALLERY */}

              <SafeAreaView style={styles.container}>
                {
                  userProfile !== null ?
                    <>
                      <FlatList
                        horizontal={false}
                        numColumns={3}
                        data={mypics}
                        keyExtractor={(index) => index._id}
                        renderItem={renderImages}

                      />
                      {console.log("userProfile", mypics)}
                    </> : <></>
                }
              </SafeAreaView>

            </View>
          </>
          :
          <>
            <Text>Yükleniyor...</Text>
          </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Profile;