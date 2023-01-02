import { Dimensions, StyleSheet } from "react-native";

const imageWidth = Dimensions.get("screen").width - 48;

export const styles = StyleSheet.create({
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 24,
    marginBottom: 8,
  },
  container: {
    width: imageWidth,
    height: 100,
    marginLeft: 24,
  },
  image: {
    height: 100,
    width: imageWidth,
  },
});
