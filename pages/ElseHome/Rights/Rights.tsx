import React from "react";
import Container from "../../../components/Container/Container";
import globalStyle from "../../../utils/styles";
import { FlatList } from "react-native";
import { rightsMedia } from "../../../data/rights";
import RightLink from "../../../components/RightLink/RightLink";
import { Text } from "react-native-paper";

const Rights = () => {
  return (
    <Container style={globalStyle.container}>
      <Text variant="headlineSmall">Ссылки на используемые материалы:</Text>
      <FlatList
        style={globalStyle.mt20}
        data={rightsMedia}
        renderItem={({ item, index }) => (
          <RightLink order={(index + 1).toString()} rightMedia={item} />
        )}
      />
    </Container>
  );
};

export default Rights;
