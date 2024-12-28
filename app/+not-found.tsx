import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text>404 - Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
