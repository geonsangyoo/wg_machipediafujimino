// Standard
import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Custom
import Tab1Screen from './Home/Tab1';
import Tab2Screen from './Home/Tab2';
import Tab3Screen from './Home/Tab3';
import Tab4Screen from './Home/Tab4';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

const TabBar = ({ state, descriptors, navigation, position }) => {
    const indexBackgroundColors = [
        Colors.accentColorTab1,
        Colors.accentColorTab2,
        Colors.accentColorTab3,
        Colors.accentColorTab4
    ];
    return (
      <View style={{
            flexDirection: 'row',
            backgroundColor: Colors.defaultBackgroundColor,
            width: Dimensions.get("window").width,
            height: 50,
        }}>
        {
            state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : ( options.title !== undefined
                    ? options.title
                    : route.name);

                const isFocused = state.index === index;
        
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
        
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
        
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View
                        key={ index }
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: Dimensions.get("window").width / state.routes.length,
                                height: 50,
                                backgroundColor: isFocused ? indexBackgroundColors[index] : Colors.defaultBackgroundColor,
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.borderColor,
                            }}
                        />
                        <TouchableOpacity
                            key={ index }
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={ options.tabBarTestID }
                            onPress={ onPress }
                            onLongPress={ onLongPress }
                        >
                            <Text style={{
                                fontFamily: 'meiryoUI',
                                fontWeight: 'bold',
                                color: isFocused ? Colors.defaultBackgroundColor : Colors.noAccentColor,
                            }}>
                                { label }
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })
        }
      </View>
    );
};

const HomeScreen = () => {
    
    const Tab = createMaterialTopTabNavigator();
    
    return (
        <Tab.Navigator
            tabBar={(props) => {
                return (
                    <TabBar { ...props} />
                );
            }}
        >
            <Tab.Screen
                name="Tab1"
                component={ Tab1Screen }
                options={{
                    title: "ふじみのPR"
                }}
            />
            <Tab.Screen
                name="Tab2"
                component={ Tab2Screen }
                options={{
                    title: "ふじみの市"
                }}
            />
            <Tab.Screen
                name="Tab3"
                component={ Tab3Screen }
                options={{
                    title: "ふじみ市"
                }}
            />
            <Tab.Screen
                name="Tab4"
                component={ Tab4Screen }
                options={{
                    title: "さいたま県ニュース"
                }}
            />
        </Tab.Navigator>
    );

};

export default HomeScreen;
