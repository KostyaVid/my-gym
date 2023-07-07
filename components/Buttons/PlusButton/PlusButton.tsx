import { Animated, GestureResponderEvent, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { FAB } from "react-native-paper";

type PlusButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const PlusButton: React.FC<PlusButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <FAB onPress={onPress} icon="plus" animated />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 50,
    bottom: 75,
  },
});

export default PlusButton;
