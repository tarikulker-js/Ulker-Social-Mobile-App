import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LocalStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '../config.json';

export default function CreateNewPost({navigation,route}){
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
    
    const [title, setTitle] = useState(getDetails("title"))
    const [desc, setDesc] = useState(getDetails("desc"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)
	const [jwt, setJwt] = useState(null);
	

	useEffect(() => {
		LocalStorage.getItem("jwt").then((getedJwt) => {
			setJwt(getedJwt);

		})
	}, [])

    const submitData = ()=>{
		console.log("creating...");
		console.log(jwt);

		fetch(`${API_URL}/createpost`, {
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
              navigation.navigate("Home");

			 setTitle(getDetails("title"));
			 setDesc(getDetails("desc"));
			 setPicture(getDetails("picture"))
			 
          })
          .catch(err=>{
            Alert.alert("Sunucu hatası!")
        })
    }

    const updateDetails = ()=>{
        fetch("http://10.0.2.2:3000/update",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                title,
                desc
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is updated successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
          Alert.alert("someting went wrong")
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
              console.log("new file", newfile)
                //handleUpload(newfile)
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
   

    return(
     <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View >
            <TextInput
                label='Başlık'
                style={styles.inputStyle}
                value={title}
                onFocus={()=>setenableShift(false)}
                theme={theme}
                mode="outlined"
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                label='Açıklama'
                style={styles.inputStyle}
                value={desc}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setDesc(text)}
            />
             <Button 
             style={styles.inputStyle}
             icon={picture==""?"upload":"check"}
              mode="contained" 
              theme={theme}
              onPress={() => setModal(true)}>
                    Resim Yükle
             </Button>
             {route.params?
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => updateDetails()}>
                   Güncelle
             </Button>
             : 
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => submitData()}>
                   Oluştur
             </Button>
             }
     
             
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

             <Text>{"\n"}</Text>
             <Button 
                style={styles.inputStyle}
                mode="contained"
                theme={theme}
                onPress={() => navigation.navigate("NewReels")}
             >
                 Reels yükle
             </Button>
         
      </View>
      </KeyboardAvoidingView>
     
 
    )
}

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