import Container from 'components/Container';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import Txt from 'components/Txt';
import fetchStoryblok from 'connectors/storyblok';
import {useApp} from 'contexts/app';
import React from 'react';
import {View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import LinearGradient from 'react-native-linear-gradient';
import render from 'util/storyblok-rich-text';
import styles from './styles';

const HelpIndex: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [story, setStory] = React.useState<any>(null);
  const [activeSections, setActiveSections] = React.useState([]);
  const {language} = useApp();

  React.useEffect(() => {
    fetchStoryblok('48429742', language ?? 'en').then((response) => {
      setStory(response.data.story);
      setLoading(false);
    });
  }, [language]);

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
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
        <View style={styles.contentInner}>{render(section.body)}</View>
      </View>
    );
  };

  console.log('the story', story);

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
            sections={story.content.questions}
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
