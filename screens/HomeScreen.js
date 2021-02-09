// Standard
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

// Custom
import Tab1Screen from './Home/Tab1';
import Tab2Screen from './Home/Tab2';
import Tab3Screen from './Home/Tab3';
import Tab4Screen from './Home/Tab4';
import DateHelpers from '../helpers/DateHelpers';
import Colors from '../constants/Colors';

const TabBar = ({ state, descriptors, navigation }) => {

    const weather = useSelector(states => states.weather.weather);
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
                    <Text style={ styles.weatherContent }>{ DateHelpers.getTodayString() }</Text>
                    { weather.today !== undefined ?
                        <View style={ styles.weatherDetail }>
                            <Image
                                source={{ uri: weather.today.imgUrl }}
                                style={ styles.weatherImg }
                            />
                            <Text style={ styles.weatherTextStyle }>
                                { weather.today.title }
                            </Text>
                            <Text style={ styles.highTempTextStyle }>
                                { weather.today.highTmp }
                            </Text>
                            <Text style={ styles.hightempUpperStyle }>
                                ℃
                            </Text>
                            <Text style={ styles.tempSlashStyle }>
                                /
                            </Text>
                            <Text style={ styles.lowTempTextStyle }>
                                { weather.today.lowTmp }
                            </Text>
                            <Text style={ styles.lowtempUpperStyle }>
                                ℃
                            </Text>
                        </View>
                        : null
                    }
                </View>
                <View style={ styles.weatherWidget }>
                    <Text style={ styles.weatherContent }>{ DateHelpers.getTomorrowString() }</Text>
                    { weather.tomorrow !== undefined ?
                        <View style={ styles.weatherDetail }>
                        <Image
                            source={{ uri: weather.tomorrow.imgUrl }}
                            style={ styles.weatherImg }
                        />
                        <Text style={ styles.weatherTextStyle }>
                            { weather.tomorrow.title }
                        </Text>
                        <Text style={ styles.highTempTextStyle }>
                            { weather.tomorrow.highTmp }
                        </Text>
                        <Text style={ styles.hightempUpperStyle }>
                            ℃
                        </Text>
                        <Text style={ styles.tempSlashStyle }>
                            /
                        </Text>
                        <Text style={ styles.lowTempTextStyle }>
                            { weather.tomorrow.lowTmp }
                        </Text>
                        <Text style={ styles.lowtempUpperStyle }>
                            ℃
                        </Text>
                    </View>
                        : null
                    }
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
                                        fontFamily: 'Noto Sans JP',
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
                    title: "埼玉県ニュース"
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
        paddingTop: 10,
        borderRightWidth: 1,
        borderRightColor: Colors.borderColor,
    },
    weatherContent: {
        textAlign: 'center',
        fontFamily: 'meiryoUI',
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.noAccentColor,
    },
    weatherDetail: {
        flexDirection: 'row',
    },
    weatherImg: {
        marginLeft: 15,
        marginTop: 3,
        width: 34,
        height: 36,
        backgroundColor: 'transparent'
    },
    weatherTextStyle: {
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'Noto Sans JP',
        fontSize: 14,
        color: Colors.noAccentColor,
    },
    highTempTextStyle: {
        marginTop: 0,
        marginLeft: 20,
        fontFamily: 'Noto Sans JP',
        fontSize: 23,
        color: Colors.highTempColor,
    },
    lowTempTextStyle: {
        marginTop: 7,
        marginLeft: 5,
        fontFamily: 'Noto Sans JP',
        fontSize: 18,
        color: Colors.lowTempColor,
    },
    hightempUpperStyle: {
        marginTop: 7,
        fontFamily: 'Noto Sans JP',
        fontSize: 10,
        color: Colors.noAccentColor,
    },
    lowtempUpperStyle: {
        marginTop: 10,
        fontFamily: 'Noto Sans JP',
        fontSize: 10,
        color: Colors.noAccentColor,
    },
    tempSlashStyle: {
        marginTop: 8,
        marginLeft: 5,
        fontFamily: 'Noto Sans JP',
        fontSize: 15,
        color: Colors.noAccentColor,
    },
});

export default HomeScreen;
