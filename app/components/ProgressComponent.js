import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Title, ProgressBar} from 'react-native-paper';
import {COLORS} from '../styles/theme';

export default function ProgressComponent({habit}) {
  const [points, setPoints] = useState(habit.consPts);
  const [percentage, setPerc] = useState(0);
  const [title, setTitle] = useState('Beginner Achievement');

  //calculate points percentage for progress bar
  React.useEffect(() => {
    if (points <= 50) {
      setTitle('Beginner Achievement');
      setPerc(points / 50);
    }
    if (points > 50 && points <= 100) {
      setTitle('Amateur Achievement');
      setPerc((points - 50) / 50);
    }
    if (points > 100 && points <= 200) {
      setTitle('Pro Achievement');
      setPerc((points - 100) / 100);
    }
  }, [points]);

  return (
    <View>
      <Title>{title}</Title>
      <ProgressBar
        progress={percentage}
        color={COLORS.primaryLight}
        style={{height: 20}}
      />
      <Text>{points}/50 Points</Text>
    </View>
  );
}
