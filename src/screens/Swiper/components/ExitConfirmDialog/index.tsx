import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import Box from 'components/Box';
import Title from 'components/Title';
import Txt from 'components/Txt';
import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {useApp} from 'contexts/app';

interface Props {
  onCancel: (event: GestureResponderEvent) => void;
  onConfirm: (event: GestureResponderEvent) => void;
}

const ExitConfirmDialog: React.FC<Props> = ({onCancel, onConfirm}) => {
  const {setOptions} = useNavigation();
  const {t} = useApp();
  const [activeYes, setActiveYes] = React.useState(false);
  const [activeNo, setActiveNo] = React.useState(false);

  React.useEffect(() => {
    setOptions({
      headerStyle: {
        opacity: 0,
      },
    });

    return () => {
      setOptions({
        headerStyle: {
          opacity: 100,
        },
      });
    };
  }, [setOptions]);
  return (
    <View style={styles.container}>
      <BlurView blurType="dark" style={styles.bg}>
        <View style={styles.box}>
          <Box withBorder>
            <Title mainBig center textCenter style={styles.title}>
              {t('swiper.cancelTitle')}
            </Title>

            <Txt center copy style={styles.text}>
              {t('swiper.cancelText')}
            </Txt>

            <View style={styles.actions}>
              <TouchableWithoutFeedback
                onPress={onCancel}
                onPressIn={() => setActiveNo(true)}
                onPressOut={() => setActiveNo(false)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={[
                    activeNo === true ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.5)',
                  ]}
                  style={styles.button}>
                  <Txt style={styles.buttonText} medium>
                    {t('swiper.cancelActionNo')}
                  </Txt>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={onConfirm}
                onPressIn={() => setActiveYes(true)}
                onPressOut={() => setActiveYes(false)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={[
                    activeYes === true ? '#B92727' : '#F03434',
                    '#B92727',
                  ]}
                  style={styles.button}>
                  <Txt style={styles.buttonText} medium>
                    {t('swiper.cancelActionYes')}
                  </Txt>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </Box>
        </View>
      </BlurView>
    </View>
  );
};

export default ExitConfirmDialog;
