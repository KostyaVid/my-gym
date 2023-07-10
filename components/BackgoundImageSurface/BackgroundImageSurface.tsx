import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { Surface, useTheme } from "react-native-paper";

type Props = {
  children: ReactNode;
  img?: ImageSourcePropType | undefined;
  style?: any;
};

const BackgroundImageSurface: React.FC<Props> = ({ children, img, style }) => {
  const { dark } = useTheme();
  if (img)
    return (
      <ImageBackground source={img} style={style}>
        <View
          style={[
            {
              backgroundColor: dark
                ? "rgba(0,0,0,0.4)"
                : "rgba(255,255,255,0.5)",
            },
            styles.container,
          ]}
        >
          {children}
        </View>
      </ImageBackground>
    );

  return <Surface style={style}>{children}</Surface>;
};

export default BackgroundImageSurface;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
