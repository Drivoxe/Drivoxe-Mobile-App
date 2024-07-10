import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handlePress = (routeName: string, index: number) => {
    const isFocused = state.index === index;

    if (!isFocused) {
      navigation.navigate(routeName);
    }

    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string = options.tabBarLabel as string || options.title as string || route.name;
        const icon = options.tabBarIcon ? options.tabBarIcon({
          focused: state.index === index,
          color: '#000',
          size: 24
        }) : null;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route.name, index)}
            style={styles.tab}
          >
            <Ionicons name="home" size={24} />
            {expandedIndex === index && (
              <Animated.View style={styles.tabName}>
                
                <Text style={styles.buttonText}>{label}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabName: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
  

  

export default CustomTabBar;
