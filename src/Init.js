import React from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react/native";
import { Container, Txt } from "components";
import SelectCountry from "./screens/SelectCountry/SelectCountry";
import { Loader } from "components";
import Navigator from "./Navigator";

class Init extends React.Component {
  render() {
    if (this.props.app.hydrated === false) {
      return (
        <Container>
          <Loader fullscreen />
        </Container>
      );
    }

    if (this.props.app.country === null) {
      return (
        <SelectCountry />
      );
    }
    return (
      <Navigator />
    );
  }
}

export default inject('app')(observer(Init));
