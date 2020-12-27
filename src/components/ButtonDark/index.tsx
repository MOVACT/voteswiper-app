import React from 'react';
import {GestureResponderEvent, TouchableHighlight, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from '../Txt';
import styles from './styles';

interface Props {
  text: string | React.ReactElement;
  icon?: string;
  center?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const ButtonDark: React.FC<Props> = ({text, center = false, onPress}) => {
  const [active, setActive] = React.useState(false);

  return (
    <TouchableHighlight
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      underlayColor="rgba(0,0,0,0)"
      tvParallaxProperties={{
        shiftDistanceX: 0,
        shiftDistanceY: 5,
        tiltAngle: 0.0,
        magnification: 1.05,
        pressMagnification: 0.95,
      }}>
      <View style={styles.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,1)']}
          style={[styles.bg, active === true ? styles.bgActive : {}]}
        />
        <View style={styles.inner}>
          {center === true ? (
            <View style={styles.textWithIcon}>
              <Txt style={styles.text} medium>
                {text}
              </Txt>
            </View>
          ) : (
            <Txt style={styles.text} medium>
              {text}
            </Txt>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonDark;
