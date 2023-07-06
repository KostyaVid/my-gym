import { ImageSourcePropType } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar } from "react-native-paper";

type ExerciseThumbProps = {
  thumbImg: ImageSourcePropType | undefined;
};

const ExerciseThumb: React.FC<ExerciseThumbProps> = observer(({ thumbImg }) => {
  if (thumbImg) {
    return <Avatar.Image size={60} source={thumbImg} />;
  } else {
    return (
      <Avatar.Image
        size={60}
        source={require("./../../data/imgExercises/none.jpg")}
      />
    );
  }
});

export default ExerciseThumb;
