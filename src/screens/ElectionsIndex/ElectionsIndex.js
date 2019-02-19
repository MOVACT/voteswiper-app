import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react/native";
import { Container, Txt } from "components";
import stores from "stores";
import { getCountryFlag } from "util";
import ChevronRight from "../../icons/ChevronRight";

const styles = StyleSheet.create({
  countryLink: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    paddingRight: 10,
  },
  countryLinkText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5
  }
});

class ElectionsIndex extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingsCountry');
          }}
          style={styles.countryLink}
        >
          <View style={styles.countryFlag}>
            {getCountryFlag(stores.app.country.country_code, { width: 28, height: 20 })}
          </View>
          <Txt style={styles.countryLinkText} medium>{stores.app.country.name}</Txt>
          <ChevronRight />
        </TouchableOpacity>
      ),
    };
  }
  render() {
    return (
      <Container>
        <Txt>hello</Txt>
      </Container>
    );
  }
}

export default inject('app')(observer(ElectionsIndex));