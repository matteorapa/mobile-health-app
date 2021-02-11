import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Title, ProgressBar, Colors} from 'react-native-paper';

export default function ProgressComponent( {habit} ) {
  
  const [points, setPoints] = useState(habit.consPts)
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
  });

  return (
    <View>
      <Text>Progress screen</Text>

      <Title>{title}</Title>
      <ProgressBar
        progress={percentage}
        color={Colors.blue800}
        style={{height: 30}}
      />
      <Text>{points}/50 points</Text>
    </View>
  );
}
