import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Font from '../constants/Font';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const routeIcons: { [key: string]: any } = {
    Home: require('../assets/home.png'),
    Search: require('../assets/search.png'),
    Notifications: require('../assets/notification.png'),
    Profile: require('../assets/profile.png'),
    // Add more routes and icons as needed
  };

  const handlePress = (routeName: string, index: number) => {
    const isFocused = state.index === index;

    if (!isFocused) {
      navigation.navigate(routeName);
    }

    if (expandedIndex !== index) {
      setExpandedIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string = (options.tabBarLabel as string) || (options.title as string) || route.name;
        const icon = options.tabBarIcon ? options.tabBarIcon({
          focused: state.index === index,
          color: '#000',
          size: 24,
        }) : null;

        const Icon = routeIcons[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route.name, index)}
            style={[
              styles.tab,
              expandedIndex === index ? styles.selectedTab : null,
            ]}
          >
            {Icon && <Image source={Icon} style={styles.tabIcon} />}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    // Add more styles as needed
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectedTab: {
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabName: {
    // Add styles for the expanded tab name view
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Font["poppins-bold"],

    // Add styles for the button text
  },
});

export default CustomTabBar;
