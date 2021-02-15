import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Title, ProgressBar} from 'react-native-paper';
import {COLORS} from '../styles/theme';

export default function ProgressComponent({habit}) {
  const [points, setPoints] = useState(habit.consPts);
  const [denominator, setDeno] = useState(0);
  const [percentage, setPerc] = useState(0);
  const [title, setTitle] = useState('Beginner Achievement');

  //calculate points percentage for progress bar
  React.useEffect(() => {
    if (points <= 50) {
      setTitle('Beginner Achievement');
      setDeno(50);
      setPerc(points / 50);
    }
    if (points > 50 && points <= 100) {
      setTitle('Amateur Achievement');
      setDeno(100);
      setPerc((points - 50) / 50);
    }
    if (points > 100 && points <= 200) {
      setTitle('Pro Achievement');
      setDeno(200);
      setPerc((points - 100) / 100);
    }
  }, [points]);

  return (
    <View>
      <Title>{title}</Title>
      <ProgressBar
        progress={percentage}
        color={COLORS.secondaryLight}
        style={{height: 20}}
      />
      <Text>{points}/{denominator} Points</Text>
    </View>
  );
}
