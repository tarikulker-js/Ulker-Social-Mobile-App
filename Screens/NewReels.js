import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LocalStorage from "@react-native-async-storage/async-storage";
import Loading from 'react-native-loading-spinner-overlay';

import { API_URL } from '../config.json';

export default function CreateNewPost({navigation,route}){
    const getDetails = (type)=>{
       if(route.params){
          switch(type){
              case "title":
                  return route.params.title
          }
       }
       return ""
    }
    
    const [title, setTitle] = useState(getDetails("title"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)
	const [jwt, setJwt] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [textContent, setTextContent] = useState("Lütfen bekleyiniz, yükleniyor... ");
    
	

	useEffect(() => {
		LocalStorage.getItem("jwt").then((getedJwt) => {
			setJwt(getedJwt);

		})
	}, [])

    const submitData = ()=>{
        setLoading(true);
        setTextContent("Post oluşturuluyor... ");

		console.log("creating...");
		console.log(jwt);

		fetch(`${API_URL}/createreels`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + jwt
			},
			body: JSON.stringify({
				title: title,
				video: picture
			})
		})
          .then(res=>res.json())
          .then(data=>{
              setLoading(false);
              setTextContent("Yükleniyor, lütfen bekleyiniz...  ");
			  console.log(data)
              Alert.alert("Post oluşturuldu")

			 setTitle(getDetails("title"));
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
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
      if(granted){
        console.log("izinler verildi. ")
           let data =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                includeBase64: true
            })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
                  
              }
              console.log(newfile)
              console.log(data)
                handleUpload(newfile)
            }
      }else{
         Alert.alert("Lütfen UlkerSocial uygulamasının izinlerini verdiğinizden emin olun.")
      }
   }
   const pickFromCamera = async ()=>{
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
      if(granted){
          console.log("izinler verildi. ")
           let data =  await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Videos,
                allowsEditing:true,
                aspect:[16,9],
                quality:0.5
            })
          if(!data.cancelled){
              let newfile = { 
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}` 

            }
            console.log(newfile)
              handleUpload(newfile)
          }
      }else{
         Alert.alert("Lütfen UlkerSocial uygulamasının izinlerini verdiğinizden emin olun.")
      }
   }


   const handleUpload = (image)=>{
        setLoading(true);
        setTextContent("Video upload ediliyor... ");
        const data = new FormData()
        data.append('file',image)
        data.append("upload_preset","tut_social")
		data.append("cloud_name","doaf7ybhd")
        data.append("resource_type", "auto")

        fetch("https://api.cloudinary.com/v1_1/doaf7ybhd/video/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            setLoading(false);
            setTextContent("Lütfen bekleyiniz, yükleniyor... ");
			console.log("upload video", data);

            if(data.error){
                alert(data.error.message);

            }
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
			console.log(err)
            Alert.alert("error while uploading")
        })
   }
   

    return(
        <>
            <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
                <View >
                    {isLoading ? <Loading visible={true} textContent={textContent} /> : <Loading visible={false} textContent={textContent} />}
                    <TextInput
                        label='Başlık'
                        style={styles.inputStyle}
                        value={title}
                        onFocus={()=>setenableShift(false)}
                        theme={theme}
                        mode="outlined"
                        onChangeText={text => setTitle(text)}
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

                    <Text>loading: {JSON.stringify(isLoading)}</Text>
            
                    
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
                        onPress={() => navigation.navigate("NewPostInGallery")}
                    >
                        Post yükle
                    </Button>
                
            </View>
            </KeyboardAvoidingView>
        </>
 
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