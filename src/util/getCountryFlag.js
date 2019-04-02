import React from "react";
import { View } from "react-native";
import DE from "../icons/DE";
import CZ from "../icons/CZ";
import FR from "../icons/FR";
import PL from "../icons/PL";
import AT from "../icons/AT";
import DK from "../icons/DK";
import FI from "../icons/FI";
import HU from "../icons/HU";
import IT from "../icons/IT";
import SE from "../icons/SE";
import RO from "../icons/RO";
import NL from "../icons/NL";
import ET from "../icons/EE";
import LT from "../icons/LT";
import GR from "../icons/GR";

function getCountryFlag(identifier, props) {
  let passProps = props;
  if (typeof props === "undefined") {
    passProps = {}
  }

  switch(identifier) {
    case "de":
      return <DE {...passProps} />
    case "cz":
      return <CZ {...passProps} />
    case "fr":
      return <FR {...passProps} />
    case "pl":
      return <PL {...passProps} />
    case "at":
      return <AT {...passProps} />;
    case "dk":
      return <DK {...passProps} />;
    case "fi":
      return <FI {...passProps} />;
    case "hu":
      return <HU {...passProps} />;
    case "it":
      return <IT {...passProps} />;
    case "se":
      return <SE {...passProps} />;
    case "ro":
      return <RO {...passProps} />;
    case "nl":
      return <NL {...passProps} />;
    case "et":
    case "ee":
      return <ET {...passProps} />;
    case "lt":
      return <LT {...passProps} />;
    case "gr":
      return <GR {...passProps} />;
  }

  return <View />;
}

export default getCountryFlag;
