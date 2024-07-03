// Stepper.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from '../components/progressbar'; // Adjust the import path as needed
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const steps = [
  "Discover the finest street art masterpiece.",
  "Experience the creativity of diverse and distinctive paintings.",
  "Find the perfect offer tailored to your needs."
];

const Stepper = ({ navigation }: { navigation: any }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{steps[currentStep]}</Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={nextStep}>
        <Text style={styles.registerButtonText}>{currentStep < steps.length - 1 ? "Next" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 45,
    justifyContent: 'space-between', // Ensure content is spaced out
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSize.large,
    fontFamily: Font["poppins-regular"],
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    fontSize: FontSize.large,
    textAlign: "center",
  },
  registerButton: {
    width: '100%',
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    alignItems: 'center',
    justifyContent: 'center', // Ensure text is centered vertically
    marginBottom: Spacing * 2,
  },
});

export default Stepper;
