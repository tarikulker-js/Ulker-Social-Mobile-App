import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import { API_URL } from "../config.json";
import axios from "axios";
import LocalStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client/dist/socket.io";

export default function ChatScreen() {
  const [socket, setSocket] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(async () => {
    const getedUserIdFromLocalStorage = await LocalStorage.getItem("userid").then((getedUserId) => {return getedUserId})
    setUserId(getedUserIdFromLocalStorage)

    var socketConnection = await io(API_URL);

    setSocket(socketConnection)

    axios.get(API_URL + "/get-messages").then((lastMessages) => {
        console.log("last messages", lastMessages.data)
      lastMessages.data.map((lastMessage) => {
        console.log("lastMessage", { message: lastMessage.data.message, author: lastMessage.author.name })
        setMessages((messages) => [
          ...messages,
          { message: lastMessage.data.message, author: lastMessage.author },
        ]);
      });
    });

    socketConnection
      .on("message", (data) => {
        const getedAuthor = data.author;
        const getedMessage = data.data.message;

        setMessages((messages) => [
          ...messages,
          { message: getedMessage, author: getedAuthor },
        ]);

      });
  }, []);

  const renderChat = () => {
    return messages.map((mapedMessage) => (
      <View key={mapedMessage._id}>
        {
            mapedMessage.author._id !== userId ? 
            <>
            <View className="message" style={{ display: "flex", backgroundColor: "#BCBCBC", width: "45%", borderRadius: 25, marginLeft: 10, marginTop: 7.5, marginBottom: 7.5 }}>
            <Text style={{ display: "flex", marginLeft: 5 }}>
              <Text style={{ marginLeft: 7.5, fontWeight: "bold" }}>{mapedMessage.author.name}</Text>:{" "}
              <Text>
                <Text>{mapedMessage.message}</Text>
              </Text>
            </Text>
          </View>
          </> : 
          <View className="message" style={{ display: "flex", backgroundColor: "#007DE1", width: "45%", alignSelf: 'flex-end', borderRadius: 25, marginRight: 10, marginTop: 7.5, marginBottom: 7.5 }}>
          <Text style={{ display: "flex", marginLeft: 7.5 }}>
            <Text style={{ fontWeight: "bold" }}>{mapedMessage.author.name}</Text>:{" "}
            <Text>
              <Text>{mapedMessage.message}</Text>
            </Text>
          </Text>
        </View>
        }  
      </View>
    ));
  };

  const sendMessage = async (e) => {
    if(message == "" || !message) {
        return alert("Lütfen bir mesaj giriniz.")
    }
    socket.emit('message', {
        message,
        author: userId
    })

    setMessage("")
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 40,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={36}
          onPress={() => {
            navigation.navigate("Ulker Social");
          }}
        />
        <Text style={{ fontSize: 25, fontWeight: "500", marginRight: "35%" }}>UlkerSocial</Text>
        
      </View>

      <ScrollView>{renderChat()}</ScrollView>

      <TextInput
          keyboardType="submit"
          value={message}
        placeholder="Yeni mesaj "
        style={{ opacity: 0.8 }}
        onChangeText={(e) => {setMessage(e)}}
        theme={{
          dark: false,
          colors: {
            text: "black",
            accent: "#ffffff",
            primary: "white",
            placeholder: "#f5f5f5",
            background: "gray",
          },
        }}
        underlineColor="#f5f5f5"
        underlineColorAndroid="#f5f5f5"
        onSubmitEditing={(e) => sendMessage(e)}
      />
    </View>
  );
}
