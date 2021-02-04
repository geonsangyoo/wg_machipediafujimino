// Standard
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

// Custom
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const FreeMarketScreen = props => {
    return (
        <SafeAreaView style={ Styles.container }>
            <View style={{
                ...styles.container, ...styles.weatherHeaderContainer }}>
                <View style={ styles.weatherWidget }>
                    <Text style={ styles.weatherContent }>今日</Text>
                </View>
                <View style={ styles.weatherWidget }>
                    <Text style={ styles.weatherContent }>明日</Text>
                </View>
            </View>
            <View style={ Styles.container }>
                <Text>
                    FreeMarket Screen!
                </Text>
            </View>
        </SafeAreaView>
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
    weatherWidget: {
        width: Dimensions.get("window").width / 2,
        flex: 1,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: Colors.borderColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    weatherContent: {
        textAlign: 'center',
    },
});

export default FreeMarketScreen;
