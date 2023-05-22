import { View, StyleSheet } from "react-native";
import CalendarPicker, { CustomDateStyle } from "react-native-calendar-picker";
import React from "react";
import { useStore } from "../../store/rootStore.store";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { daysFormat, monthsFormat } from "../../utils/constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CalendarNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

const Calendar = observer(() => {
  const navigation = useNavigation<CalendarNavigation>();
  const store = useStore();
  const { colors } = useTheme();
  const sessions = store.sessions.sessions;
  const daysSessions: CustomDateStyle[] = sessions.map((sess) => {
    return {
      // date: moment(sess.dateStart).startOf("day"),
      date: new Date(sess.dateStart),
      style: style.sessionDate,
    };
  });

  return (
    <View>
      <CalendarPicker
        weekdays={daysFormat}
        months={monthsFormat}
        startFromMonday={true}
        previousTitle={"Прошлый"}
        nextTitle={"Следующий"}
        customDatesStyles={daysSessions}
        maxDate={new Date()}
        textStyle={{ color: colors.text }}
        disabledDatesTextStyle={{ color: colors.border }}
        todayBackgroundColor="#ff8888"
        selectedDayColor="#999933"
        onDateChange={(date) => {
          const session = sessions.filter((el) =>
            moment(el.dateStart).startOf("day").isSame(date.startOf("day"))
          );
          if (session.length === 0) return;

          if (session.length === 1) {
            navigation.navigate("DailyHome", {
              screen: "Session",
              params: {
                sessionID: session[0].sessionID,
                trainingID: session[0].trainingID,
              },
            });
          } else {
            navigation.navigate("DailyHome", {
              screen: "ChooseSession",
              params: {
                date: date.toDate().getTime(),
              },
            });
          }
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  sessionDate: {
    backgroundColor: "#339933",
  },
});

export default Calendar;
