import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Ionicons } from "@expo/vector-icons";

function FaceDetection() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [eyeLeft, setEyeLeft] = useState({ x: 0, y: 0 });
  const [eyeRigth, setEyeRigth] = useState({ x: 0, y: 0 });
  const [rightEyeOpen, setRightEyeOpen] = useState();
  const [leftEyeOpen, setLeftEyeOpen] = useState();
  const [bounds, setBounds] = useState();
  const [rollAngle, setRollAngle] = useState(0);
  const [rightEar, setRightEar] = useState({ x: 0, y: 0 });
  const [leftEar, setLeftEar] = useState({ x: 0, y: 0 });
  const [nose, setNose] = useState({ x: 0, y: 0 });
  const [mouth, setMouth] = useState({ x: 0, y: 0 });
  const [smile, setSmile] = useState({ x: 0, y: 0 });
  const iconSize = 60;

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
    // console.log(faces[0]?.leftEyeOpenProbability);
    setBounds(faces[0]?.bounds);
    setLeftEyeOpen(faces[0]?.leftEyeOpenProbability);
    setRightEyeOpen(faces[0]?.rightEyeOpenProbability);
    setEyeLeft(faces[0]?.LEFT_EYE);
    setEyeRigth(faces[0]?.RIGHT_EYE);
    setRollAngle(faces[0]?.rollAngle);
    setRightEar(faces[0]?.RIGHT_EAR);
    setLeftEar(faces[0]?.LEFT_EAR);
    setNose(faces[0]?.NOSE_BASE);
    setMouth(faces[0]?.BOTTOM_MOUTH);
    setSmile(faces[0]?.smilingProbability);
  };

  return (
    <View style={styles.cameraContainer}>
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
      {bounds && (
        <View
          style={{
            position: "absolute",
            top: bounds.origin.y,
            left: bounds.origin.x,
            height: bounds.size.height,
            width: bounds.size.width,
            borderColor: "red",
            borderWidth: 2,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        />
      )}
      {eyeLeft && (
        <View
          style={{
            position: "absolute",
            top: eyeLeft.y - 30,
            left: eyeLeft.x - 30,
            height: 60,
            width: 60,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          {leftEyeOpen >= 0.5 ? (
            <Ionicons name="eye" size={iconSize} color="white" />
          ) : (
            <Ionicons name="eye-off" size={iconSize} color="white" />
          )}
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
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          {rightEyeOpen >= 0.5 ? (
            <Ionicons name="eye" size={iconSize} color="white" />
          ) : (
            <Ionicons name="eye-off" size={iconSize} color="white" />
          )}
        </View>
      )}
      {rightEar && (
        <View
          style={{
            position: "absolute",
            top: rightEar.y - 30,
            left: rightEar.x - 60,
            height: 60,
            width: 60,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          <Ionicons
            name="ear"
            size={60}
            color="white"
            style={{ transform: [{ rotateY: `180deg` }] }}
          />
        </View>
      )}
      {leftEar && (
        <View
          style={{
            position: "absolute",
            top: leftEar.y - 30,
            left: leftEar.x,
            height: 60,
            width: 60,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          <Ionicons name="ear" size={60} color="white" />
        </View>
      )}
      {nose && (
        <View
          style={{
            position: "absolute",
            top: nose.y - 30,
            left: nose.x - 30,
            height: 60,
            width: 60,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          <Ionicons name="baseball" size={60} color="white" />
        </View>
      )}
      {mouth && (
        <View
          style={{
            position: "absolute",
            top: mouth.y - 60,
            left: mouth.x - 30,
            height: 60,
            width: 60,
            transform: [{ rotate: `${rollAngle}deg` }],
          }}
        >
          {smile >= 0.2 ? (
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={60}
              color="white"
            />
          ) : (
            <Ionicons name="ellipsis-horizontal" size={60} color="white" />
          )}
        </View>
      )}
    </View>
  );
}

module.exports = FaceDetection;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
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
