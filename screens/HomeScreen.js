// Standard
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Custom
import Tab1Screen from './Home/Tab1';
import Tab2Screen from './Home/Tab2';
import Tab3Screen from './Home/Tab3';
import Tab4Screen from './Home/Tab4';
import Colors from '../constants/Colors';

const HomeScreen = props => {
    
    const Tab = createMaterialTopTabNavigator();
    
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontSize: 12,
                    fontFamily: "meiryoUI",
                    fontWeight: "bold"
                },
                activeTintColor: Colors.accentColor,
                inactiveTintColor: Colors.noAccentColor,
            }}
        >
            <Tab.Screen
                name="Tab1"
                component={ Tab1Screen }
                options={{
                    title: "富士見野PR"
                }}
            />
            <Tab.Screen
                name="Tab2"
                component={ Tab2Screen }
                options={{
                    title: "富士見野市"
                }}
            />
            <Tab.Screen
                name="Tab3"
                component={ Tab3Screen }
                options={{
                    title: "富士見市"
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

});

export default HomeScreen;
