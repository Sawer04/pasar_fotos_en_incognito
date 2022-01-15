import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.jp! desde otra rama</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
