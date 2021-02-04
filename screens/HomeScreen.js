// Standard
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Custom
import Tab1Screen from './Home/Tab1';
import Tab2Screen from './Home/Tab2';
import Tab3Screen from './Home/Tab3';
import Tab4Screen from './Home/Tab4';
import Colors from '../constants/Colors';

const TabBar = ({ state, descriptors, navigation, position }) => {
    const indexBackgroundColors = [
        Colors.accentColorTab1,
        Colors.accentColorTab2,
        Colors.accentColorTab3,
        Colors.accentColorTab4
    ];
    return (
        <SafeAreaView>
            <View style={{
                ...styles.container, ...styles.weatherHeaderContainer }}>
                <View style={ styles.weatherWidget }>
                    <Text style={ styles.weatherContent }>今日</Text>
                </View>
                <View style={ styles.weatherWidget }>
                    <Text style={ styles.weatherContent }>明日</Text>
                </View>
            </View>
            <View style={{
                ...styles.container, ...styles.tabBarHeaderContainer
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
                                    borderTopWidth: 1,
                                    borderTopColor: indexBackgroundColors[state.index],
                                    borderBottomWidth: 1,
                                    borderBottomColor: indexBackgroundColors[state.index],
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
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <Text style={{
                                        fontFamily: 'meiryoUI',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                        color: isFocused ? Colors.defaultBackgroundColor : Colors.noAccentColor,
                                    }}>
                                        { label }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })
            }
            </View>
        </SafeAreaView>
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.defaultBackgroundColor,
        width: Dimensions.get("window").width,
    },
    weatherHeaderContainer: {
        height: 70,
    },
    tabBarHeaderContainer: {
        height: 50,
    },
    weatherWidget: {
        width: Dimensions.get("window").width / 2,
        flex: 1,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: Colors.borderColor,
    },
    weatherContent: {
        textAlign: 'center'
    },
});

export default HomeScreen;
