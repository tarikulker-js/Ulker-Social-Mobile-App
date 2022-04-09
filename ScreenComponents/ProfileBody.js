import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  user,
}) => {
  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {accountName}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: "black",
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: "black",
                paddingHorizontal: 15,
              }}
            />
            <Feather
              name="menu"
              style={{
                fontSize: 25,
              }}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={profileImage}
            style={{
              resizeMode: "cover",
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: "bold",
              marginTop: -10,
            }}
          >
            {user.email}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{post}</Text>
          <Text>Gönderi</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{followers}</Text>
          <Text>Takipçi</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{following}</Text>
          <Text>Takip</Text>
        </View>
      </View>

      <View>
        <Text style={{ paddingVertical: 2, marginLeft: 15, marginTop: -3 }}>
          {user.bio}
        </Text>
      </View>

      <View>
        <Text
          onPress={() => Linking.openURL(user.site)}
          style={{
            paddingVertical: 2,
            marginLeft: 15,
            marginTop: 3,
            color: "cyan",
          }}
        >
          {user.site}
        </Text>
      </View>

      {/* 121-134 buglu. */}
    </View>
  );
};

export const ProfileButtons = ({
  user,
  userProfile,
  profilePic,
  mypics,
  myid,
}) => {
  //id, name, accountName, profileImage
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);

  return (
    <>
      {user._id === myid ? (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.push("EditProfile", {
                user: user,
                userProfile: userProfile,
                profilePic: profilePic,
                mypics: mypics,
                myid: myid,
              })
            }
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                borderColor: "#DEDEDE",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}
              >
                Profilinizi Düzenleyin
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{ width: "42%" }}
          >
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : "#3493D9",
                borderWidth: follow ? 1 : 0,
                borderColor: "#DEDEDE",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: follow ? "black" : "white" }}>
                {follow ? "Takip Ediliyor" : "Takip et"}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: "42%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text>Message</Text>
          </View>
          <View
            style={{
              width: "10%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Feather
              name="chevron-down"
              style={{ fontSize: 20, color: "black" }}
            />
          </View>
        </View>
      )}
    </>
  );
};
