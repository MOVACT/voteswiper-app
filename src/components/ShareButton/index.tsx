import React from 'react';
import {TouchableOpacity, Share, Platform, View} from 'react-native';
import ShareIcon from '../../icons/Share';
import styles from './styles';

interface Props {
  message: string;
  title: string;
  url?: string;
}

const ShareButton: React.FC<Props> = ({message, title, url}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        let shareMessage = message;

        if (Platform.OS === 'android') {
          shareMessage = `${message} ${url ?? ''}`;
        }

        Share.share({
          message: shareMessage,
          title: title,
          url,
        });
      }}>
      <View style={styles.button}>
        <ShareIcon height={24} width={18} />
      </View>
    </TouchableOpacity>
  );
};

export default ShareButton;
