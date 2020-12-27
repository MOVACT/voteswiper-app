import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Accordion from 'react-native-collapsible/Accordion';
import Container from 'components/Container';
import Txt from 'components/Txt';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import {useQuery} from 'util/api';
import styles from './styles';

const HelpIndex: React.FC = () => {
  const [activeSections, setActiveSections] = React.useState([]);
  const {loading, error, data} = useQuery('GET_FAQ');

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }
  if (error) {
    return <View />;
  }

  const updateSections = (sections) => {
    setActiveSections(sections);
  };

  const renderSectionTitle = () => {
    return <View style={styles.content} />;
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Txt medium style={styles.headerText}>
          {section.title}
        </Txt>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Txt style={styles.body}>{section.content}</Txt>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <ScrollContainer withPadding>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#fff', '#EFF3FF']}
          style={styles.container}>
          <Accordion
            activeSections={activeSections}
            sections={data.faqs}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            touchableProps={{
              underlayColor: 'transparent',
            }}
            onChange={updateSections}
          />
        </LinearGradient>
      </ScrollContainer>
    </Container>
  );
};

export default HelpIndex;
