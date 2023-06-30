import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import Touch from "../../Touch/Touch";

type PlusButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const PlusButton: React.FC<PlusButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Touch style={styles.button} onPress={onPress}>
        <Svg style={styles.plus} viewBox="0 0 448 512">
          <Path
            fill="#FFFFFF"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </Svg>
      </Touch>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 50,
    bottom: 75,
    alignSelf: "flex-end",
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
