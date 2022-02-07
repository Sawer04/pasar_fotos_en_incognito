import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SharePicture")}
      >
        <Text style={styles.textButton}>Compartir foto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FaceDetection")}
      >
        <Text style={styles.textButton}>Detector de cara</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Accelerometro")}
      >
        <Text style={styles.textButton}>Grito</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Impresion")}
      >
        <Text style={styles.textButton}>Impresion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "purple",
  },
  textButton: {
    color: "white",
    fontSize: 26,
  },
});
