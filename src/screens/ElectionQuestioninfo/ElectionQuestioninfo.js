import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Container from 'components/Container';
import Txt from 'components/Txt';
import Title from 'components/Title';
import Close from 'icons/Close';
import t from 'util/t';
import styles from '../ElectionSwiper/styles';
import PrevButton from '../ElectionSwiper/partials/PrevButton';

class ElectionQuestioninfo extends React.Component {
  render() {
    const {
      question,
      explainer_text,
      title,
    } = this.props.navigation.state.params;
    return (
      <Container noPadding>
        <View style={styles.root}>
          <View style={styles.header}>
            <View style={styles.headerAbsolute}>
              <View style={styles.headerLeft}>
                <PrevButton
                  onPress={() => {
                    this.props.navigation.dispatch({type: 'Navigation/BACK'});
                  }}
                />
              </View>
              <View style={styles.headerTitle}>
                <Txt medium style={styles.headerTitleText}>
                  {t('navigation.backTitle')}
                </Txt>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.dispatch({type: 'Navigation/BACK'});
                }}
                style={styles.headerButton}>
                <Close />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.container}>
              <ScrollView style={{marginTop: 10}}>
                <View style={styles.explainerContent}>
                  <Title h5 center uppercase>
                    {title}
                  </Title>
                  <Title
                    mainBig
                    style={{color: '#fff', textAlign: 'center'}}
                    center>
                    {question}
                  </Title>

                  <Txt style={{marginTop: 20, fontSize: 16, color: '#fff'}}>
                    {explainer_text}
                  </Txt>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default ElectionQuestioninfo;
