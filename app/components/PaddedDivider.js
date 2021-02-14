import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function PaddedDivider() {
  return <View style={STYLE.divider} />;
}

const STYLE = StyleSheet.create({
  divider: {
    marginTop: 12,
    marginBottom: 12,
  },
});
