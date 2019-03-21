import { StyleSheet, Dimensions } from "react-native";

const iPhone6 = 375;
const { width } = Dimensions.get("window");

let rootPadding = 20;
let questionsPadding = 30;

if (width < iPhone6) {
  rootPadding = 15;
  questionsPadding = 20;
}

export default StyleSheet.create({
  questions: {
    padding: questionsPadding,
    paddingTop: 0
  },
  reason: {
    marginHorizontal: -rootPadding,
    paddingHorizontal: rootPadding,
    paddingVertical: rootPadding - 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    marginTop: 15
  },
  reasonText: {
    color: "#392f52",
    fontSize: 14,
    lineHeight: 20
  },
  thesis: {
    fontSize: 16,
    lineHeight: 20,
    color: '#392F52',
  },
  reasonLink: {
    marginTop: 5,
    color: "#392F52",
    fontSize: 14,
    opacity: 0.9
  },
  answers: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 10
  },
  answer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  noneLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(60, 60, 60, 1)",
    borderRadius: 5,
    marginTop: 5
  },
  yesLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#12a73b",
    borderRadius: 5,
    marginTop: 5
  },
  noLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#b92727",
    borderRadius: 5,
    marginTop: 5
  },
  labelText: {
    color: "#fff",
    fontSize: 14
  },

  partyDetail: {
    flexDirection: "column",
    alignItems: "center"
  },
  partyDetailLogo: {
    width: 200,
    height: 70,
    marginTop: questionsPadding,
    marginBottom: 15,
  },
  partyDetailButton: {
    width,
    paddingHorizontal: questionsPadding
  },
  partyDetailTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5
  }
});
