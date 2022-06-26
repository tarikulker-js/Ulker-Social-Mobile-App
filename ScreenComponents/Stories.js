import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

export default function Stories() {
    const navigation = useNavigation();

    const storyInfos=[
        {
            _id: 1,
            name: "My Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        {
            _id: 0,
            name: "Story",
            image: 'https://avatarfiles.alphacoders.com/161/thumb-161679.jpg'
        },
        
    ]

    return(
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
            {
                storyInfos.map((data, index) => {
                    return(
                        <TouchableOpacity key={index} onPress={() => navigation.push("Status", {
                            name: data.name,
                            image: data.image
                        })}>
                            <View style={{
                                flexDirection: 'column',
                                paddingHorizontal: 8,
                                position: 'relative'
                            }}>
                                {data._id == 1 ? 
                                <View style={{
                                    position: 'absolute',
                                    bottom: 15,
                                    right: 10,
                                    zIndex: 1
                                }}>
                                    <Entypo 
                                        name="circle-with-plus"
                                        style={{
                                            fontSize: 20,
                                            color: '#405de6',
                                            backgroundColor: 'white',
                                            borderRadius: 100,
                                        }}
                                    />
                                </View> : null}
                                <View style={{
                                    width: 68,
                                    height: 68,
                                    backgroundColor: 'white',
                                    borderWidth: 1.8,
                                    borderRadius: 100,
                                    borderColor: '#c13584',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image 
                                        source={{ uri: data.image }}
                                        style={{
                                            resizeMode: 'cover',
                                            width: '92%',
                                            height: '92%',
                                            borderRadius: 100,
                                            backgroundColor: 'orange',
                                        }}
                                    />
                                </View>
                                <Text style={{ textAlign: 'center', fontSize: 10, opacity: data._id == 0 ? 1 : 0.5 }} >{data.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}