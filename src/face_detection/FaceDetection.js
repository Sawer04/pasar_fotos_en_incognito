import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

function FaceDetection() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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
      {eyeLeft && (
        <View
          style={{
            position: "absolute",
            top: eyeLeft.y - 8,
            left: eyeLeft.x - 8,
            height: 16,
            width: 16,
            backgroundColor: "red",
          }}
        ></View>
      )}
      {eyeLeft && (
        <View
          style={{
            position: "absolute",
            top: eyeRigth.y - 8,
            left: eyeRigth.x - 8,
            height: 16,
            width: 16,
            backgroundColor: "red",
          }}
        ></View>
      )}
    </View>
  );
}

module.exports = FaceDetection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
