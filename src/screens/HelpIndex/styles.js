import { StyleSheet } from "react-native";
import { ifIphoneX } from "util";

export default StyleSheet.create({
  content: {
    backgroundColor: "rgba(57,47,82,0.1)"
  },
  contentInner: {
    padding: 20,
    flex: 1,
  },
  container: {
    backgroundColor: "#fff"
  },
  headerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#59568B"
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(57,47,82,0.1)"
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: "#392F52"
  },
  root: {
    padding: 25,
    ...ifIphoneX({ paddingTop: 40 }, { paddingTop: 15 })
  },
  screenTitle: {
    paddingBottom: 20
  }
});
