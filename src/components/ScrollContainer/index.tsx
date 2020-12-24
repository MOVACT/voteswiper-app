import React from 'react';
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import styles from './styles';
import {isIphoneX} from 'util/iPhoneXHelper';

interface Props extends ScrollViewProps {
  withPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ScrollContainer: React.FC<Props> = ({
  withPadding = false,
  style,
  children,
  ...props
}) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        <ScrollView
          {...props}
          style={[
            {
              marginTop: headerHeight + 10,
            },
            style,
          ]}>
          <View style={withPadding ? styles.withPadding : {}}>{children}</View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ScrollContainer;
