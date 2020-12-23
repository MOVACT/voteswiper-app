import React from 'react';
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import {headerHeight} from 'common';
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
  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        <ScrollView
          {...props}
          style={[
            {
              marginTop: isIphoneX() ? headerHeight() : headerHeight() + 10,
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
