// Standard
import React from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import DateHelpers from '../helpers/DateHelpers';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const FreeMarketScreen = props => {

    const weather = useSelector(states => states.weather.weather);

    return (
        <SafeAreaView style={ Styles.container }>
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
            <View style={{ ...Styles.container,  ...styles.freeMarketContainer }}>
                <Image
                    source={
                        require('../assets/images/freeMarketLogo.png')
                    }
                    style={{
                        width: Dimensions.get("window").width - 30,
                        height: Dimensions.get("window").width * 0.961
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get("window").width,
        backgroundColor: Colors.defaultBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    freeMarketContainer: {
        marginTop: 20,
        justifyContent: 'flex-start',
    },
    weatherHeaderContainer: {
        height: 70,
    },
    weatherWidget: {
        width: Dimensions.get("window").width / 2,
        marginTop: 10,
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

export default FreeMarketScreen;
