import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SharePicture from "./src/share_picture/SharePicture";
import FaceDetection from "./src/face_detection/FaceDetection";
import HomeScreen from "./src/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SharePicture" component={SharePicture} />
        <Stack.Screen name="FaceDetection" component={FaceDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
