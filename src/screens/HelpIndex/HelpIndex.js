import React from "react";
import { View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Accordion from "react-native-collapsible/Accordion";
import { Container, Txt, Title, Loader, ScrollContainer } from "components";
import { Query, t } from "util";
import styles from "./styles";

class HelpIndex extends React.Component {
  static navigationOptions = {
    title: t('helpIndex.title'),
  }
  constructor(props) {
    super(props);

    this.state = {
      activeSections: [],
    };
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  _renderSectionTitle() {
    return <View style={styles.content} />;
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Txt medium style={styles.headerText}>
          {section.title}
        </Txt>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Txt style={styles.body}>{section.content}</Txt>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Query query="GET_FAQ">
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) return <Loader fullscreen />;
            if (error) {
              return <View />;
            }

            return (
              <ScrollContainer withPadding>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#fff", "#EFF3FF"]}
                style={styles.container}
              >
                <Accordion
                  activeSections={this.state.activeSections}
                  sections={data.faqs}
                  renderSectionTitle={this._renderSectionTitle}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  touchableProps={{
                    underlayColor: "transparent"
                  }}
                  onChange={this._updateSections}
                />
              </LinearGradient>
            </ScrollContainer>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default HelpIndex;
