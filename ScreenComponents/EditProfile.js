import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL } from '../config.json'

const EditProfile = ({ route, navigation }) => {
  const { user, userProfile, profilePic, mypics, myid } = route.params;
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };

  var [name, setName] = useState(user.name);
  var [website, setWebsite] = useState(user.site);
  var [bio, setBio] = useState(user.bio);


  useEffect(() => {
    console.log("editProfile USER", user);
  }, []);

  const updateProfileAPI = () => {
    console.log("updating profile...");

    axios.post(`${API_URL}/updatename`, {
      postData: {
        name,
        userId: myid
      }
    }).then(resName => {
      console.log("updated name");

      axios.post(`${API_URL}/updatebio`, {
        postData: {
          bio,
          userId: myid
        }
      }).then(resBio => {
        console.log("updated bio");

        axios.post(`${API_URL}/updatesite`, {
          postData: {
            site: website,
            userId: myid
          }
        }).then(resSite => {
          console.log("updated site");

          TostMessage();
          alert("edited. ");
          navigation.goBack();

        }).catch(errSite => {
          console.log(errSite);

        })

      }).catch(errBio => {
        console.log(errBio);

      })//update_bio

    }).catch(errName => {
      console.log(errName);

    })//update_name

  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Profilinizi Düzenleyin</Text>
        <TouchableOpacity
          onPress={() => {
            updateProfileAPI();

          }}>
          <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={{ uri: profilePic }}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Text
          style={{
            color: '#3493D9',
          }}>
          Profil Fotoğrafını Güncelle (Çok Yakında!)
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}>
            İsim
          </Text>
          <TextInput
            onChangeText={(name) => setName(name)}
            placeholder="İsim"
            defaultValue={user.name}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            onChangeText={(website) => setWebsite(website)}
            placeholder="Website"
            defaultValue={user.site}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            onChangeText={(bio) => setBio(bio)}
            placeholder="Bio"
            defaultValue={user.bio}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
      </View>
      <View>
        <Text>Name: {name}</Text>
        <Text>website: {website}</Text>
        <Text>bio: {bio}</Text>

      </View>
    </View>
  );
};

export default EditProfile;