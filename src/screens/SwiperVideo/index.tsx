import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import FullScreenVideo from 'components/FullScreenVideo';
import React from 'react';
import {ModalStackParamList} from 'types/routes';

type VideoScreenRouteProp = RouteProp<ModalStackParamList, 'Video'>;

const SwiperVideo: React.FC = () => {
  const {setOptions, goBack} = useNavigation();
  const {params} = useRoute<VideoScreenRouteProp>();
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
