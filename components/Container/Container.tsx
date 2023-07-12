import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";

type ContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Container: React.FC<ContainerProps> = observer(({ children, style }) => {
  return (
    <View style={style ? [styles.container, style] : styles.container}>
      {children}
    </View>
  );
});

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
