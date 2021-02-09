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
                            // await ref.recordAsync({
                            //     mute: true
                            // });
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
                        onBarCodeRead={({ data, type }) => {
                            if (!isScanned) {
                                if (type === RNCamera.Constants.BarCodeType.qr) {
                                    setIsScanned(true);
                                    Linking.canOpenURL(data)
                                        .then(supported => {
                                            if (supported) {
                                                Alert.alert(
                                                    "確認",
                                                    `読み取ったアドレスにアクセスしますか？\n(${ data })`,
                                                    [
                                                        {
                                                            text: 'はい',
                                                            style: 'default',
                                                            onPress: () => {
                                                                setIsScanned(false);
                                                                setIsClicked(false);
                                                                Linking.openURL(data);
                                                            }
                                                        },
                                                        {
                                                            text: 'いいえ',
                                                            style: 'cancel',
                                                            onPress: () => {
                                                                setIsScanned(false);
                                                            }
                                                        }
                                                    ],
                                                    {
                                                        cancelable: false
                                                    }
                                                );
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
                            }
                        }}
                        captureAudio={ false }
                        androidCameraPermissionOptions={{
                            title: "カメラ機能権限要請",
                            message: "カメラ機能の承認が必要になります",
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: "オーディオ機能権限要請",
                            message: 'オーディオ機能の承認が必要になります',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        flashMode={ RNCamera.Constants.FlashMode.auto }
                        type={ RNCamera.Constants.Type.back }
                    >
                        <View style={{ marginTop: 10, marginLeft: 10, alignItems: 'flex-start' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsClicked(false);
                                }}
                            >
                                <View>
                                    <Icon
                                        name="close-circle-outline"
                                        style={{
                                            color: Colors.defaultBackgroundColor
                                        }}
                                        size={ 30 }
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                ) : ( isFocused ?
                    <View style={ Styles.container }>
                        <Pressable>
                            <Icon
                                name="qrcode-scan"
                                size={ 100 }
                            />
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => {
                                setIsClicked(true);
                            }}
                        >
                            <View style={ styles.cardContainerStyle }>
                                <Text style={ styles.cardTextStyle }>
                                    スキャン
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
        marginTop: 20,
        width: 100,
        height: 35,
        borderRadius: 10,
        borderColor: Colors.noAccentColor,
        borderWidth: 1,
    },
    cardTextStyle: {
        marginTop: 3,
        fontFamily: 'meiryoUI',
        fontSize: 18,
        alignSelf: 'center',
        color: Colors.noAccentColor,
    },
});

export default PointScreen;
