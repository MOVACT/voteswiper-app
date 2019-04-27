import { StyleSheet, Dimensions, Platform } from "react-native";
import { headerHeight } from "common";
import { ifIphoneX } from "util";

const borderRadius = 15;
const cardBorderRadius = 15;

const iPhone6 = 375;
const { width, height } = Dimensions.get("window");

// screen height - bottom - header - padding content

// Party Tile
let paddingTile = 5;
let paddingList = 25;
let doubleWeightLabelContainerBottom = 2;
let partiesPerRow = 3;
let partyBgPadding = 10;
let partyBorderRadius = 10;
let partySubtract = 18;
let cardThumbnailHeight = 150;
/*
 * Styling For Card
 */
let cardMarginTop = 0;
let cardMarginLeft = 30;
let swiperPaddingTop = Platform.OS === "android" ? 0 : 10;
let swiperMarginTop = 0;
let cardInnerPadding = 25;
let cardHeight = height - 90 - headerHeight() - 80;
let yesNoButtonInnerHeight = 60;
let yesNoButtonFontSize = 16;
let containerPaddingHorizontal = 30;
let partyLogoHeight = 50;

if (Platform.OS === "android") {
  cardMarginTop = 10;
  doubleWeightLabelContainerBottom = 0;
}

if (width < iPhone6) {
  cardMarginLeft = 15;
  swiperPaddingTop = 0;
  swiperMarginTop = -5;
  cardInnerPadding = 15;
  cardHeight = cardHeight = height - 90 - headerHeight() - 45;
  yesNoButtonInnerHeight = 50;
  yesNoButtonFontSize = 12;
  containerPaddingHorizontal = 20;
  paddingTile = 5;
  paddingList = 15;
  partyLogoHeight = 60;
  partiesPerRow = 2;
  partyBgPadding = 5;
  partyBorderRadius = 15;
  partySubtract = paddingList;
}

if (Platform.isPad) {
  cardThumbnailHeight = Math.round(
    ((width - cardInnerPadding * 2 - containerPaddingHorizontal * 2) * 9) / 16
  );
}

const cardWidth = width - 2 * cardMarginLeft;

export default StyleSheet.create({
  yesNoButton: {
    borderRadius: 100,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 2,
    // flex: 1,
    marginHorizontal: 10,
    width: yesNoButtonInnerHeight,
  },
  yesNoButtonInner: {
    borderRadius: 100,
    backgroundColor: "transparent",
    height: yesNoButtonInnerHeight,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  yesNoButtonText: {
    fontSize: yesNoButtonFontSize,
    color: "#fff"
  },
  yesNoButtonBg: {
    borderRadius: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  root: {
    flex: 1,
    flexDirection: "column"
  },
  yesNoControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 30 : 40,
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  swiper: {
    flex: 1,
    paddingBottom: 0, // IOS WAS 30
    paddingTop: swiperPaddingTop,
    marginTop: swiperMarginTop
  },

  /**
   * Header Styles
   */
  header: {
    width,
    height: headerHeight(),
    paddingHorizontal: containerPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    ...ifIphoneX(
      {
        paddingTop: 30
      },
      {
        paddingTop: 15
      }
    )
  },
  headerAbsolute: {
    position: "absolute",
    top: 0,
    height: headerHeight(),
    ...ifIphoneX(
      {
        paddingTop: 30
      },
      {
        paddingTop: 15
      }
    ),
    left: containerPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  headerLeft: {
    flexDirection: "row"
  },
  headerTitle: {
    flex: 1,
    marginLeft: 10
  },
  headerTitleText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    fontWeight: "600"
  },
  headerButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerNavButtonDisabled: {
    opacity: 0.5
  },
  headerNavButtonPrev: {
    marginRight: 5
  },

  /**
   * Card Styles
   */
  cardHolder: {
    width: cardWidth,
    height: cardHeight,
    elevation: 1
  },
  card: {
    flex: 1,
    borderRadius: cardBorderRadius,
    backgroundColor: "#fff",
    width: cardWidth,
    height: cardHeight,
    marginTop: cardMarginTop,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    marginLeft: cardMarginLeft,
    overflow: Platform.OS === "ios" ? "hidden" : "visible"
  },
  cardDouble: {
    borderColor: "#E6E90F"
  },
  cardInner: {
    flex: 1,
    borderRadius: cardBorderRadius,
    padding: cardInnerPadding,
    // overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    overflow: "visible"
  },
  cardBorder: {
    borderColor: "#E6E90F",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderWidth: 4,
    borderRadius: cardBorderRadius
  },

  cardVideo: {
    flex: 1,
    maxHeight: cardThumbnailHeight
  },
  cardThumbnail: {
    flex: 1,
    maxHeight: cardThumbnailHeight,
    borderRadius: 5
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  videoControl: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  videoPlay: {
    width: 50,
    height: 50,
    paddingLeft: 4,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  doubleWeightLabelContainer: {
    position: "absolute",
    bottom: doubleWeightLabelContainerBottom,
    left: 0,
    right: 0,
    height: 32,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center"
  },
  doubleWeightLabel: {
    height: 30,
    backgroundColor: "transparent",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  doubleWeightedLabel: {
    backgroundColor: "#E6E90F"
  },
  doubleWeightLabelText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12
  },

  nopeOverlay: {
    top: cardMarginTop,
    left: cardMarginLeft,
    right: 0,
    bottom: 0,
    borderRadius: cardBorderRadius,
    position: "absolute",
    backgroundColor: "rgba(240, 52, 52, 0.8)"
  },
  yupOverlay: {
    top: cardMarginTop,
    left: cardMarginLeft,
    right: 0,
    bottom: 0,
    borderRadius: cardBorderRadius,
    position: "absolute",
    backgroundColor: "rgba(0, 230, 64, 0.8)"
  },

  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -10,
    marginBottom: -30,
    overflow: "hidden",
    flex: 1,
    width
  },
  /* Party */
  partiesList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: paddingList,
    paddingBottom: 110
  },
  party: {
    width: width / partiesPerRow - partySubtract,
    paddingHorizontal: paddingTile,
    paddingTop: paddingTile * 2
  },
  partyLogo: {
    flex: 1,
    height: partyLogoHeight
  },
  partyShadow: {
    backgroundColor: "#D9DAEB",
    borderRadius: partyBorderRadius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 1
  },
  partyBg: {
    padding: partyBgPadding,
    borderRadius: partyBorderRadius,
    borderWidth: 4,
    borderColor: "transparent",
    overflow: "hidden"
  },
  partySelected: {
    borderColor: "#E6E90F"
  },
  explainer: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: containerPaddingHorizontal
  },
  explainerText: {
    color: "#fff",
    lineHeight: 20
  },
  progressBg: {
    paddingHorizontal: 30,
    ...ifIphoneX({ paddingBottom: 50 }, { paddingBottom: 30 })
  },
  progress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },

  /* Result */
  resultToolbarContainer: {
    paddingTop: 20,
    paddingHorizontal: containerPaddingHorizontal,
  },
  resultToolbar: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  resultToolbarButton: {
    paddingLeft: 10,
    flex: 1
  },
  resultToolBarBtn: {
    flex: 1
  },
  resultList: {
    flex: 1,
    paddingHorizontal: containerPaddingHorizontal,
    paddingTop: 10
  },

  /* Top Match */
  topMatchContainer: {
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 5
  },
  topMatch: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  topMatchLogo: {
    width: 80,
    height: 50
  },
  topMatchLogoImage: {
    width: 80,
    height: 50
  },
  topMatchContent: {
    paddingLeft: 15,
    flex: 1
  },
  topMatchSubTitle: {
    fontSize: 10,
    marginTop: 0
  },
  topMatchTitle: {
    fontSize: 14,
    color: "#392F52",
    marginBottom: 5
  },
  programLink: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  programLinkText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#000000"
  },

  screenshotArea: {
    position: "absolute",
    left: -1000,
    top: 150,
    width: 500,
    padding: 40,
    paddingTop: 20,
    backgroundColor: "#392F52"
  },

  selectPartyActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  selectPartyAction: {
    width: (width - containerPaddingHorizontal * 2) / 2 - 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  selectPartyActionDisabled: {
    opacity: 0.5
  },
  selectPartyActionText: {
    alignSelf: "center",
    color: "#fff"
  },


  editAnswersContainer: {
    padding: containerPaddingHorizontal,
    paddingBottom: 150
  },
  editAnswer: {
    position: 'relative',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '#fff',
    flex: 1,
  },
  editAnswerActive: {
    backgroundColor: '#fff',
  },

  explainerContent: {
    padding: containerPaddingHorizontal,
  }
});
