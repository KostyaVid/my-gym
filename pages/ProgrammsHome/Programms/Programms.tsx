import {
  DefaultSectionT,
  ImageBackground,
  SafeAreaView,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { TrainingDataProps, programmsData } from "../../../data/programms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import {
  Button,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import BackgroundImageSurface from "../../../components/BackgoundImageSurface/BackgroundImageSurface";

type ProgrammsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: ProgrammsScreenNavigationProp;
};

const data = programmsData.map((elem) => {
  return {
    title: elem.name,
    id: elem.id,
    data: elem.trainings,
    description: elem.description,
    thumbImg: elem.thumbImg,
  };
});

const Programms = ({ navigation }: Props) => {
  const currentProgramm = useStore().currentProgramm;
  const { colors } = useTheme();

  const sectionRender: SectionListRenderItem<TrainingDataProps> = ({
    item,
    section,
    index,
  }) => (
    <TouchableRipple
      style={[styles.training, globalStyle.padding10]}
      onPress={() => {
        navigation.navigate("ProgrammsHome", {
          screen: "Training",
          params: { trainingID: item.id, programmID: section.id },
        });
      }}
    >
      <Text>{index + 1 + ". " + item.name}</Text>
    </TouchableRipple>
  );

  const headerRender: (info: {
    section: SectionListData<TrainingDataProps, DefaultSectionT>;
  }) => React.ReactElement | null = ({ section }) => (
    <View>
      <BackgroundImageSurface
        img={section.thumbImg}
        style={styles.sectionHeader}
      >
        <View style={styles.innerImg}>
          <TouchableRipple
            style={styles.nameProgramm}
            onPress={() => {
              navigation.navigate("ProgrammsHome", {
                screen: "Programm",
                params: { programmID: section.id },
              });
            }}
          >
            <Text variant="titleLarge">{section.title}</Text>
          </TouchableRipple>
          <Button
            mode="elevated"
            icon="arrow-collapse-left"
            onPress={() => {
              currentProgramm?.setProgrammByID(section.id);
              navigation.navigate("DailyHome", { screen: "Daily" });
            }}
          >
            Начать
          </Button>
        </View>
      </BackgroundImageSurface>
      {section.description && (
        <Text style={[styles.description, globalStyle.padding10]}>
          {section.description}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={globalStyle.container}>
      <Container>
        <Text variant="headlineMedium">Выберите программу:</Text>
      </Container>
      <SectionList
        style={styles.sectionList}
        sections={data}
        renderItem={sectionRender}
        renderSectionHeader={headerRender}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Programms;

const styles = StyleSheet.create({
  sectionList: {
    marginTop: 10,
  },
  training: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  sectionHeader: {
    marginTop: 10,
  },
  nameProgramm: {
    flexShrink: 1,
  },
  description: {
    opacity: 0.6,
  },
  innerImg: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
