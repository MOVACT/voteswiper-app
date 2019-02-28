import React from "react";
import { View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Accordion from "react-native-collapsible/Accordion";
import { Container, Txt, Title, ScrollContainer } from "components";
import styles from "./styles";

const faq = [
  {
    title: "Kann ich eine Frage überspringen oder zu einer vorherigen zurück?",
    body:
      "Ja, du findest oben links zwei Pfeiltasten. Nach links bringt dich zur vorherigen Frage und nach rechts überspringt die aktuelle Frage. Wenn du eine Frage überspringst, geht sie nicht in die Wertung ein."
  },
  {
    title:
      "Warum kann ich hier mehr Parteien auswählen, als auf meinem Wahlschein stehen?",
    body:
      "Wir haben alle Parteien angefragt, die in Deutschland zur Wahl antreten. Nicht in allen Regionen sind alle Parteien verfügbar. Daher kann es sein, dass dir im WahlSwiper eine Partei angezeigt wird, die du gar nicht wählen kannst."
  },
  {
    title: "Wie wird das Ergebnis berechnet?",
    body:
      "Bei jeder Frage, die du beantwortest, vergleichen wir deine Position mit den Antworten der Parteien. Bei einer Übereinstimmung gibt es einen Punkt. Gewichtest du eine These doppelt, gibt es zwei Punkte. Bei der Auswertung zeigt die Prozentangabe an, wie sehr du mit den Antworten der Parteien übereinstimmst."
  },
  {
    title: "Von wem wurde die App entwickelt?",
    body:
      "Wir sind ein Team aus Journalisten, Politik-Studenten, App-Entwicklern, Grafikern und Videoproduzenten, das gemeinsam in seiner Freizeit an dem Projekt gearbeitet hat. Die Inhalte erarbeiten wir gemeinsam mit unabhängigen Partnern beispielsweise Universitäten. Wer das im Einzelfall ist, siehst du, wenn du eine Wahl auswählst."
  }
];

class HelpIndex extends React.Component {
  static navigationOptions = {
    title: "Hilfe"
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
          <Txt style={styles.body}>{section.body}</Txt>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <ScrollContainer withPadding>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#fff", "#EFF3FF"]}
            style={styles.container}
          >
            <Accordion
              activeSections={this.state.activeSections}
              sections={faq}
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
      </Container>
    );
  }
}

export default HelpIndex;
