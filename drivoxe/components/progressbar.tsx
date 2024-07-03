// ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            index <= currentStep ? styles.activeLine : styles.inactiveLine
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
  },
  activeLine: {
    backgroundColor: 'black',
  },
  inactiveLine: {
    backgroundColor: 'lightgray',
  },
});

export default ProgressBar;
