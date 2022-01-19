import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function FaceDetection() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [eyeLeft, setEyeLeft] = useState({ x: 0, y: 0 });
  const [eyeRigth, setEyeRigth] = useState({ x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleFacesDetected = ({ faces }) => {
    console.log(faces[0]?.LEFT_EYE);
    setEyeLeft(faces[0]?.LEFT_EYE);
    setEyeRigth(faces[0]?.RIGHT_EYE);
  };

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={{ width: "100%", height: "100%" }}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      <View style={styles.iconContainer}>
        <Ionicons name="camera-sharp" size={50} color="pink" />
        <TouchableOpacity
          onPress={() => (type === "back" ? setType("front") : setType("back"))}
        >
          <Ionicons name="camera-reverse-sharp" size={50} color="pink" />
        </TouchableOpacity>
      </View>
      {eyeLeft && (
        <View
          style={{
            position: "absolute",
            top: eyeLeft.y - 30,
            left: eyeLeft.x - 30,
            height: 60,
            width: 60,
          }}
        >
          <Ionicons name="eye" size={60} color="red" />
        </View>
      )}
      {eyeRigth && (
        <View
          style={{
            position: "absolute",
            top: eyeRigth.y - 30,
            left: eyeRigth.x - 30,
            height: 60,
            width: 60,
          }}
        >
          <Ionicons name="eye" size={60} color="red" />
        </View>
      )}
    </View>
  );
}

module.exports = FaceDetection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
    width: "100%",
    padding: 16,
  },
});
