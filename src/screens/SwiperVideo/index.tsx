import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import FullScreenVideo from 'components/FullScreenVideo';
import React from 'react';
import {ModalStackParamList} from 'types/routes';

type ModalVideoScreenRouteProp = RouteProp<ModalStackParamList, 'ModalVideo'>;

const SwiperVideo: React.FC = () => {
  const {setOptions, goBack} = useNavigation();
  const {params} = useRoute<ModalVideoScreenRouteProp>();
  React.useEffect(() => {
    setOptions({
      headerShown: false,
    });
  }, [setOptions]);
  return (
    <FullScreenVideo
      source={{uri: params.video}}
      onClose={() => {
        goBack();
      }}
    />
  );
};

export default SwiperVideo;
