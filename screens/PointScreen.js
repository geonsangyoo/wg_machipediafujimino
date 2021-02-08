// Standard
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Image, Pressable, TouchableOpacity, Linking, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom
import DateHelpers from '../helpers/DateHelpers';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const PointScreen = props => {
    
    const camera = {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto
    };
    const weather = useSelector(states => states.weather.weather);
    const isFocused = useIsFocused();
    const [isClicked, setIsClicked] = useState(false);
    const [isScanned, setIsScanned] = useState(false);
    const [cameraSetting, setCameraSetting] = useState(camera);

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
            { isClicked ?
                (
                    <RNCamera
                        ref={ref => {
                            setCameraSetting(ref);
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                        }}
                        onMountError={(err) => {
                            Alert.alert(
                                "警告",
                                `カメラが見つかりませんでした\n${ err.message }`,
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            setIsScanned(false);
                                            setIsClicked(false);
                                        },
                                        style: 'destructive',
                                    }
                                ],
                                {
                                    cancelable: false
                                }
                            );
                        }}
                        notAuthorizedView={(
                            <View style={ Styles.container }>
                                <Text style={{ ...styles.cardTextStyle, color: Colors.noAccentColor }}>
                                    カメラ権限が与えられていません
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("home");
                                    }}
                                >
                                    <View style={ styles.cardContainerStyle }>
                                        <Text style={ styles.cardTextStyle }>
                                            戻る
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        onBarCodeRead={({ scanResult }) => {
                            if (!isScanned) {
                                if (scanResult.data) {
                                    setIsScanned(true);
                                    Linking.canOpenURL(scanResult.data)
                                        .then(supported => {
                                            if (supported) {
                                                Linking.openURL(scanResult.data);
                                                setIsScanned(false);
                                                setIsClicked(false);
                                            } else {
                                                Alert.alert(
                                                    "警告",
                                                    "Webブラウザが見当たりませんでした",
                                                    [
                                                        {
                                                            text: 'OK',
                                                            style: 'destructive',
                                                            onPress: () => {
                                                                setIsScanned(false);
                                                                setIsClicked(false);
                                                            }
                                                        }
                                                    ],
                                                    {
                                                        cancelable: false
                                                    }
                                                );
                                            }
                                        })
                                }
                            } else {
                                return null;
                            }
                        }}
                        permissionDialogTitle={ "カメラ機能権限要請" }
                        permissionDialogMessage={ "カメラ機能の承認が必要になります" }
                        flashMode={ RNCamera.Constants.FlashMode.auto }
                        type={ RNCamera.Constants.Type.back }
                    >
                    </RNCamera>
                ) : ( isFocused ?
                    <View style={{ ...Styles.container, justifyContent: 'flex-start' }}>
                        <Pressable
                            onPress={() => {
                                setIsClicked(true);
                            }}
                        >
                            <Icon
                                name="qrcode-scan"
                                size={ 150 }
                                style={{
                                    marginTop: 100,
                                }}
                            />
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => {
                                /**
                                 * To-Do
                                 */
                            }}
                        >
                            <View style={ styles.cardContainerStyle }>
                                <Text style={ styles.cardTextStyle }>
                                    カード一覧
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null
                )
            }
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
    weatherHeaderContainer: {
        height: 70,
    },
    weatherWidget: {
        width: Dimensions.get("window").width / 2,
        height: '100%',
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
    cardContainerStyle: {
        marginTop: 35,
        width: 150,
        height: 35,
        borderRadius: 25,
        borderColor: Colors.accentColorTab1,
        borderWidth: 2,
    },
    cardTextStyle: {
        marginTop: 0,
        fontFamily: 'Noto Sans JP',
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.accentColorTab1,
    },
});

export default PointScreen;
