import { StyleSheet, Dimensions } from "react-native";
import fonts from "../utilities/config/font";
import colors from "../utilities/config/colors";
import { normalize } from '../utilities/helpers/normalizeText'
const { width, height } = Dimensions.get('window')
export const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        ...fonts.android.regular
      },
      ios: {
        ...fonts.ios.regular
      }
    })
  },
  bold: {
    ...Platform.select({
      android: {
        ...fonts.android.WSbold
      },
      ios: {
        ...fonts.android.WSbold
      }
    }),
    color: colors.black,
    fontWeight: "bold",

  },
  RsMedium: {
    ...Platform.select({
      android: {
        ...fonts.android.medium
      },
      ios: {
        ...fonts.android.medium
      }
    }),

  },
  RsBold: {
    ...Platform.select({
      android: {
        ...fonts.android.bold
      },
      ios: {
        ...fonts.ios.bold
      }
    }),

  },
  WsRegular: {
    ...Platform.select({
      android: {
        ...fonts.android.WSRegular
      },
      ios: {
        ...fonts.android.WSRegular
      }
    }),
    color: colors.black
  },
  Wsbold: {
    ...Platform.select({
      android: {
        ...fonts.android.WSbold
      },
      ios: {
        ...fonts.android.WSbold
      }
    }),
  },
  WsMedium: {
    ...Platform.select({
      android: {
        ...fonts.android.WSMedium
      },
      ios: {
        ...fonts.android.WSMedium
      }
    }),
  },
  RalewayBold: {
    ...Platform.select({
      android: {
        ...fonts.android.bold
      },
      ios: {
        ...fonts.android.bold
      }
    }),
    color: colors.black
  },
  medium: {
    ...Platform.select({
      android: {
        ...fonts.android.medium
      },
      ios: {
        ...fonts.ios.medium
      }
    }),
    color: colors.black,
    // fontWeight: "bold"
  },
  scrollView: {
    backgroundColor: colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: colors.black
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,

  },
  content: {
    backgroundColor: 'rgb(245,247,247)',
    // padding: 22,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabIcon: {
    height: 20,
    width: 20,

  },
  modalRadius: {
    backgroundColor: colors.primary,
    opacity: 0.8,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30
    // borderTopEndRadius:20,
    // borderTopLeftRadius:20
  },
  paddingHoriZontal: {
    paddingHorizontal: 16
  },
  paddingVertical: {
    paddingVertical: 16
  },
  marginHorizontal: {
    marginHorizontal: 16
  },
  homeScreenButton: {
    position: 'absolute', bottom: 30, justifyContent: 'center'
  },
  cardView_Style:
  {

    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
    // top:'50%'
  },
  rowWithPadding: { paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'row' },
  textColor: { color: 'rgb(78,89,116)', fontSize: normalize(12) },
  smallFont: { fontSize: normalize(10) },
  signature: {
    flex: 1,
    borderColor: "#ececec",
    borderWidth: 2
  },
});
