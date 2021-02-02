// Standard
import React from 'react';
import { Platform, Image, Pressable, Dimensions } from 'react-native';
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
    inactiveTintColor: Colors.noAccentColor,
};

const homeNavigator = () => {
    return (
        <homeNavigatorScreen.Navigator
            headerMode={ Platform.OS === "ios" ? "float" : "screen" }
            screenOptions={{
                headerStyle: { height: Dimensions.get("window").height * 0.12 },
                headerTitle: () => {
                    return (
                        <Image
                            source={ require("../assets/images/headerLogo.png") }
                            style={{
                                width: 300,
                                height: 45,
                            }}
                        />
                    );
                },
                headerTitleAlign: "center",
                headerTintColor: Colors.headerIconColor,
                headerLeft: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="refresh"
                                size={ 18 }
                                style={{
                                    marginLeft: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
                headerRight: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="settings-outline"
                                size={ 18 }
                                style={{
                                    marginRight: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
            }}
        >
            <homeNavigatorScreen.Screen
                name="home"
                component={ HomeScreen }
            />
        </homeNavigatorScreen.Navigator>
    );
};

const freeMarketNavigator = () => {
    return (
        <freeMarketNavigatorScreen.Navigator
            headerMode={ Platform.OS === "ios" ? "float" : "screen" }
            screenOptions={{
                headerStyle: { height: Dimensions.get("window").height * 0.12 },
                headerTitle: () => {
                    return (
                        <Image
                            source={ require("../assets/images/headerLogo.png") }
                            style={{
                                width: 300,
                                height: 45,
                            }}
                        />
                    );
                },
                headerTitleAlign: "center",
                headerTintColor: Colors.headerIconColor,
                headerLeft: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="refresh"
                                size={ 18 }
                                style={{
                                    marginLeft: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
                headerRight: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="settings-outline"
                                size={ 18 }
                                style={{
                                    marginRight: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
            }}
        >
            <freeMarketNavigatorScreen.Screen
                name="freeMarket"
                component={ FreeMarketScreen }
            />
        </freeMarketNavigatorScreen.Navigator>
    );
};

const pointNavigator = () => {
    return (
        <pointNavigatorScreen.Navigator
            headerMode={ Platform.OS === "ios" ? "float" : "screen" }
            screenOptions={{
                headerStyle: { height: Dimensions.get("window").height * 0.12 },
                headerTitle: () => {
                    return (
                        <Image
                            source={ require("../assets/images/headerLogo.png") }
                            style={{
                                width: 300,
                                height: 45,
                            }}
                        />
                    );
                },
                headerTitleAlign: "center",
                headerTintColor: Colors.headerIconColor,
                headerLeft: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="refresh"
                                size={ 18 }
                                style={{
                                    marginLeft: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
                headerRight: () => {
                    return (
                        <Pressable>
                            <Icon
                                name="settings-outline"
                                size={ 18 }
                                style={{
                                    marginRight: 12,
                                    color: Colors.noAccentColor,
                                }}
                            />
                        </Pressable>
                    );
                },
            }}
        >
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
                tabBarOptions={{ ...defaultBottomTabOptions, style: { height: 85 } }}
                swipeEnabled={ true }
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
                                        marginTop: 10,
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
                                        marginTop: 10,
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
                                        marginTop: 10,
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
