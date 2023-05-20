import { ImageSourcePropType, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";

type ExerciseThumbProps = {
  thumbImg: ImageSourcePropType | undefined;
};

const ExerciseThumb: React.FC<ExerciseThumbProps> = observer(({ thumbImg }) => {
  if (thumbImg) {
    return <Image source={thumbImg} style={style.img} />;
  } else {
    return (
      <Image
        source={require("./../../data/imgExercises/none.jpg")}
        style={style.img}
      />
    );
  }
});

export default ExerciseThumb;

const style = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
