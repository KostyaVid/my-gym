import { Alert, Linking, StyleSheet, View } from "react-native";
import React from "react";
import { Text, TouchableRipple } from "react-native-paper";
import { RightMedia } from "../../data/rights";

type Props = {
  order: string;
  rightMedia: RightMedia;
};

const RightLink: React.FC<Props> = ({ order, rightMedia }) => {
  return (
    <View style={styles.container}>
      <Text>{order + ". "}</Text>
      <TouchableRipple
        onPress={async () => {
          const supported = await Linking.canOpenURL(rightMedia.url);
          if (supported) {
            await Linking.openURL(rightMedia.url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${rightMedia.url}`);
          }
        }}
      >
        <Text style={styles.link}>{rightMedia.textInnerLink}</Text>
      </TouchableRipple>
      <Text> {rightMedia.textOuterLink}</Text>
    </View>
  );
};

export default RightLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: {
    color: "#2222aa",
    textDecorationLine: "underline",
  },
});
