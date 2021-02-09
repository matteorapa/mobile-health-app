import { Text, View } from 'react-native';
import React from 'react';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';

export default function MindScreen( {navigation} ) {
    return (
      <View style={LAYOUT.main}>
        <Text style={TYPE.h1}>Your tasks</Text>
      </View>
    );
  }