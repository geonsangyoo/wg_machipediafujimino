// Standard
import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom
import HomeScreen from '../screens/HomeScreen';
import FreeMarketScreen from '../screens/FreeMarketScreen';
import PointScreen from '../screens/PointScreen';
import Colors from '../constants/Colors';

const homeNavigatorScreen = createStackNavigator();
const freeMarketNavigatorScreen = createStackNavigator();
const pointNavigatorScreen = createStackNavigator();
const menuTabNavigator = createBottomTabNavigator();
const defaultBottomTabOptions = {
    showIcon: true,
    showLabel: true,
    labelPosition: "below-icon",
    labelStyle: {
        fontSize: 12,
        fontFamily: "meiryoUI",
        fontWeight: "bold"
    },
    activeTintColor: Colors.accentColor,
};

const homeNavigator = () => {
    return (
        <homeNavigatorScreen.Navigator>
            <homeNavigatorScreen.Screen
                name="home"
                component={ HomeScreen }
                options={{
                    
                }}
            />
        </homeNavigatorScreen.Navigator>
    );
};

const freeMarketNavigator = () => {
    return (
        <freeMarketNavigatorScreen.Navigator>
            <freeMarketNavigatorScreen.Screen
                name="freeMarket"
                component={ FreeMarketScreen }
            />
        </freeMarketNavigatorScreen.Navigator>
    );
};

const pointNavigator = () => {
    return (
        <pointNavigatorScreen.Navigator>
            <pointNavigatorScreen.Screen
                name="point"
                component={ PointScreen }
            />
        </pointNavigatorScreen.Navigator>
    );
};

const HomeBottomTabNavigator = () => {
    return (
        <NavigationContainer>
            <menuTabNavigator.Navigator
                tabBarOptions={ defaultBottomTabOptions }
            >
                <menuTabNavigator.Screen
                    name="home"
                    component={ homeNavigator }
                    options={{
                        title: "ホーム",
                        tabBarIcon: tabInfo => {
                            return (
                                <Icon
                                    name="home-outline"
                                    color={ tabInfo.color }
                                    size={ tabInfo.size }
                                    style={{
                                        marginTop: 5,
                                    }}
                                />
                            );
                        },
                    }}
                />
                <menuTabNavigator.Screen
                    name="freeMarket"
                    component={ freeMarketNavigator }
                    options={{
                        title: "フリマ",
                        tabBarIcon: tabInfo => {
                            return (
                                <MaterialCommunityIcon
                                    name="shopping-outline"
                                    color={ tabInfo.color }
                                    size={ tabInfo.size }
                                    style={{
                                        marginTop: 5,
                                    }}
                                />
                            );
                        },
                    }}
                />
                <menuTabNavigator.Screen
                    name="point"
                    component={ pointNavigator }
                    options={{
                        title: "ポイント",
                        tabBarIcon: tabInfo => {
                            return (
                                <MaterialCommunityIcon
                                    name="alpha-p-circle-outline"
                                    color={ tabInfo.color }
                                    size={ tabInfo.size }
                                    style={{
                                        marginTop: 5,
                                    }}
                                />
                            );
                        },
                    }}
                />
            </menuTabNavigator.Navigator>
        </NavigationContainer>
    );
};

export default HomeBottomTabNavigator;
