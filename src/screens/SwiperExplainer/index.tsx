import {RouteProp, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import React from 'react';
import {ModalStackParamList} from 'types/routes';
import styles from './styles';

type ExplainerScreenRouteProp = RouteProp<ModalStackParamList, 'Explainer'>;

const SwiperExplainer: React.FC = () => {
  const {params} = useRoute<ExplainerScreenRouteProp>();

  return (
    <Container>
      <ScrollContainer>
        <View style={styles.content}>
          <Title h5 uppercase>
            {params.title}
          </Title>
          <Title mainBig>{params.question}</Title>

          <Txt style={styles.text}>{params.explainer}</Txt>
        </View>
      </ScrollContainer>
    </Container>
  );
};

export default SwiperExplainer;
