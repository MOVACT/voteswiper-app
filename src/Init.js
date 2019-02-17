import React from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react/native";
import { Container, Txt } from "components";
import SelectCountry from "./screens/SelectCountry/SelectCountry";

class Init extends React.Component {
  render() {
    if (this.props.app.country === null) {
      return (
        <SelectCountry />
      );
    }
    return (
      <Container><Txt>hi</Txt></Container>
    );
  }
}

export default inject('app')(observer(Init));
