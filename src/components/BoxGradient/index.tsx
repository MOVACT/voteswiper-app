import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const BoxGradient: React.FC = ({children}) => {
  return (
    <View style={styles.shadow}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#222043', '#000000']}
        style={styles.root}>
        {children}
      </LinearGradient>
    </View>
  );
};

export default BoxGradient;
