import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import Touch from "../../Touch/Touch";

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
      <Touch style={styles.button} onPress={onPress}>
        <Svg style={styles.plus} viewBox="0 0 448 512">
          <Path
            fill="#FFFFFF"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </Svg>
      </Touch>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 50,
    bottom: 75,
    alignSelf: "flex-end",
    opacity: 0.8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#339933",
  },
  plus: {
    width: 30,
    height: 30,
  },
});

export default PlusButton;
