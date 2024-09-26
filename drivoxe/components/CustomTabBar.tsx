import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Font from '../constants/Font';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Set the initial state to 0 to ensure the first tab (Home) is selected by default
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const routeIcons: { [key: string]: any } = {
    Home: {
      inactive: require('../assets/home.png'),
      active: require('../assets/homeout.png'),
    },
    Search: {
      inactive: require('../assets/search.png'),
      active: require('../assets/searchout.png'),
    },
    Notifications: {
      inactive: require('../assets/notification.png'),
      active: require('../assets/notificationout.png'),
    },
    Profile: {
      inactive: require('../assets/profile.png'),
      active: require('../assets/profileout.png'),
    },
  };

  const handlePress = (routeName: string, index: number) => {
    const isFocused = state.index === index;

    // Navigate to the route if it's not already focused
    if (!isFocused) {
      navigation.navigate(routeName);
    }

    // Toggle the expanded index or reset it
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    } 
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string = (options.tabBarLabel as string) || (options.title as string) || route.name;
        const isFocused = state.index === index;

        // Determine the icon to use based on the focus state and expanded index
        const Icon =
          expandedIndex === index || isFocused
            ? routeIcons[route.name].active
            : routeIcons[route.name].inactive;

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
    padding: '5%',
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
    padding: 5,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  tabName: {
    // Add styles for the expanded tab name view
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Font["poppins-bold"],
    marginHorizontal: 5,
  },
});

export default CustomTabBar;
