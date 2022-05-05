import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  Modal,
  StyleSheet
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LocalStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../config.json'

const EditProfile = ({ route, navigation }) => {
  const { user, userProfile, profilePic, mypics, myid } = route.params;
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  
  const getDetails = (type)=>{
      if(route.params){
        switch(type){
            case "title":
                return route.params.title
            case "desc":
              return route.params.desc  
        }
      }
      return ""
  }

  var [jwt, setJwt] = useState(null);
  var [name, setName] = useState(user.name);
  var [website, setWebsite] = useState(user.site);
  var [bio, setBio] = useState(user.bio);
  var [picture,setPicture] = useState(user.pic)
  var [modal,setModal] = useState(false)


  useEffect(() => {
    console.log("editProfile USER", user);

    LocalStorage.getItem("jwt").then((getedJwt) => {
      setJwt(getedJwt);

    })
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

        axios.post(`${API_URL}/updatepic`, {
          postData: {
            pic: picture,
            userId: myid
          }
        }).then(resPic => {
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

        })

      }).catch(errBio => {
        console.log(errBio);

      })//update_bio

    }).catch(errName => {
      console.log(errName);

    })//update_name

  }

  const submitData = ()=>{
		console.log("creating...");
		console.log(jwt);

		fetch(`${API_URL}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + jwt
			},
			body: JSON.stringify({
				title: title,
				body: desc,
				pic: picture
			})
		})
          .then(res=>res.json())
          .then(data=>{
			  console.log(data)
              Alert.alert("Post oluşturuldu")
              //navigation.navigate("Home")

			 setTitle(getDetails("title"));
			 setDesc(getDetails("desc"));
			 setPicture(getDetails("picture"))
			 
          })
          .catch(err=>{
            Alert.alert("Sunucu hatası!")
        })
  }

  const handleUpload = (image)=>{
    const data = new FormData()
    data.append('file',image)
    data.append("upload_preset","tut_social")
    data.append("cloud_name","doaf7ybhd")

        fetch("https://api.cloudinary.com/v1_1/doaf7ybhd/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
      console.log(data);

            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
      console.log(err)
            Alert.alert("error while uploading")
        })
    }

  const pickFromGallery = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
          if(!data.cancelled){
              let newfile = { 
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}` 
                
            }
              handleUpload(newfile)
          }
    }else{
       Alert.alert("Lütfen UlkerSocial uygulamasının izinlerini verdiğinizden emin olun.")
    }
 }
 const pickFromCamera = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
    if(granted){
         let data =  await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
        if(!data.cancelled){
            let newfile = { 
              uri:data.uri,
              type:`test/${data.uri.split(".")[1]}`,
              name:`test.${data.uri.split(".")[1]}` 

          }
            handleUpload(newfile)
        }
    }else{
       Alert.alert("Lütfen UlkerSocial uygulamasının izinlerini verdiğinizden emin olun.")
    }
 }


  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={()=>{
            setModal(false)
        }}
        >
        <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
                  <Button icon="camera"
                    theme={theme}
                  mode="contained"
                    onPress={() => pickFromCamera()}>
                          Kamera
                  </Button>
                  <Button 
                  icon="image-area"
                    mode="contained"
                    theme={theme}
                    onPress={() => pickFromGallery()}>
                          Galeri
                  </Button>
            </View>
          <Button 
            theme={theme}
          onPress={() => setModal(false)}>
                  İptal
          </Button>
        </View>
        </Modal>
        
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
            }} onPress={() => setModal(true)}>

            Profil Fotoğrafını Güncelle
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
        </View>
      </View>
    </>
  );
};

const theme = {
  colors:{
      primary:"#006aff"
  }
}

const styles=StyleSheet.create({
  root:{
     flex:1,
  },
  inputStyle:{
      margin:5
  },
  modalView:{
      position:"absolute",
      bottom:2,
      width:"100%",
      backgroundColor:"white"

  },
  modalButtonView:{
      flexDirection:"row",
      justifyContent:"space-around",
      padding:10
  }
})

export default EditProfile;