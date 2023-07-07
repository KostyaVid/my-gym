import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";

type Props = {
  date: number;
};

const TimeCounter = ({ date }: Props) => {
  const [currentDate, setCurrentDate] = useState(Date.now());
  const deltaDate = new Date(currentDate - date);
  const hours = deltaDate.getUTCHours();
  const minuts = deltaDate.getUTCMinutes();
  const seconds = deltaDate.getUTCSeconds();

  useEffect(() => {
    const timeShift = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(timeShift);
    };
  }, []);
  return (
    <Text>
      {hours}:{minuts}:{seconds}
    </Text>
  );
};

export default TimeCounter;
