import Txt from 'components/Txt';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Richtext} from 'storyblok-js-client';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  MARK_STRIKE,
  MARK_STYLED,
  MARK_UNDERLINE,
  NODE_BR,
  NODE_CODEBLOCK,
  NODE_HEADING,
  NODE_HR,
  NODE_IMAGE,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_UL,
  render as renderLib,
} from 'storyblok-rich-text-react-renderer';

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  defaultText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#392F52',
  },
});

const render = (document: Richtext) => {
  return renderLib(document, {
    markResolvers: {
      [MARK_BOLD]: (children: string) => (
        <Txt medium style={styles.defaultText}>
          {children}
        </Txt>
      ),
      [MARK_ITALIC]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [MARK_STRIKE]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [MARK_UNDERLINE]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [MARK_CODE]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [MARK_STYLED]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [MARK_LINK]: (children: string, props: any) => {
        const {href, linktype} = props;

        return (
          <TouchableOpacity
            onPress={() => {
              if (linktype === 'email') {
                Linking.openURL(`mailto:${href}`);
              } else {
                Linking.openURL(`${href}`);
              }
            }}>
            <Txt style={styles.defaultText}>{children}</Txt>
          </TouchableOpacity>
        );
      },
    },
    nodeResolvers: {
      [NODE_HEADING]: (children: string) => (
        <Txt style={styles.defaultText}>{children}</Txt>
      ),
      [NODE_CODEBLOCK]: (children: string) => (
        <View>
          <Txt style={styles.defaultText}>{children}</Txt>
        </View>
      ),
      [NODE_IMAGE]: () => <></>,
      [NODE_PARAGRAPH]: (children: string) => (
        <View>
          <Txt style={styles.defaultText}>{children}</Txt>
        </View>
      ),
      [NODE_QUOTE]: (children: string) => <View>{children}</View>,
      [NODE_OL]: (children: string) => <View>{children}</View>,
      [NODE_UL]: (children: string) => <View>{children}</View>,
      [NODE_LI]: (children: string) => <View>{children}</View>,
      [NODE_HR]: () => <View />,
      [NODE_BR]: () => <View />,
    },
    defaultStringResolver: (str: string) => (
      <Txt style={styles.defaultText}>{str}</Txt>
    ),
  });
};

export default render;
