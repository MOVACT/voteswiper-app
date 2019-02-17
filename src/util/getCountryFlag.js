import React from "react";
import { View } from "react-native";
import DE from "../icons/DE";
import FR from "../icons/FR";
import PL from "../icons/PL";
import AT from "../icons/AT";

function getCountryFlag(identifier, props) {
  let passProps = props;
  if (typeof props === "undefined") {
    passProps = {}
  }

  switch(identifier) {
    case "de":
      return <DE {...passProps} />
    case "fr":
      return <FR {...passProps} />
    case "pl":
      return <PL {...passProps} />
    case "at":
      return <AT {...passProps} />;
  }

  return <View />;
}

export default getCountryFlag;
