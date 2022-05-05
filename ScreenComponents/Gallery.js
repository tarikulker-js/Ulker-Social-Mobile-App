import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    StatusBar,
    ScrollView,
    Image,
    RefreshControl
  } from "react-native";
  
export default function Gallery({userProfile, mypics}){
    return(
        <SafeAreaView style={styles.container}>
                {userProfile !== null ? (
                <>
                    <FlatList
                    horizontal={false}
                    numColumns={3}
                    data={mypics}
                    keyExtractor={(index) => index._id}
                    renderItem={(item) => {
                        return (
                          <View key={item.item._id} style={{ flex: 1, alignItems: "center" }}>
                            <Image
                              source={{ uri: item.item.picture }}
                              style={{
                                height: 100,
                                width: 100,
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {console.log("userProfile", mypics)}
                </>
                ) : (
                <></>
                )}
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
    },
  });
  