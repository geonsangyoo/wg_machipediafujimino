// Standard
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

const Tab3Screen = props => {

    const fujimishiNews = useSelector(state => state.news.news.fujimishiNews);
    const titleMaxLength = 25;

    return (
        <View style={{ ...Styles.container, justifyContent: 'flex-start' }}>
            {   ( fujimishiNews !== undefined ) ?
                <FlatList
                    data={ fujimishiNews }
                    style={{
                        width: Dimensions.get("window").width,
                        margin: 5,
                    }}
                    renderItem={(items) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    margin: 10,
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: Colors.defaultBackgroundColor,
                                    borderColor: Colors.accentColorTab3,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    Linking.canOpenURL(items.item.newsURL)
                                        .then(supported => {
                                            if (supported) {
                                                Linking.openURL(items.item.newsURL);
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
                                }}
                            >
                                <Image
                                    source={
                                        require("../../assets/images/fujimishiLogo.png")
                                    }
                                    style={{
                                        width: 25,
                                        height: 25,
                                        top: 12.5,
                                        left: 10,
                                        backgroundColor: "transparent"
                                    }}
                                />
                                <View style={{
                                    marginTop: 5,
                                    marginLeft: 30,
                                }}>
                                    <Text style={{ ...styles.titleTextStyle, fontFamily: 'Noto Sans JP', fontSize: 13 }}>
                                        { items.item.date }
                                    </Text>
                                    <View>
                                        <Text
                                            style={ styles.titleTextStyle }
                                        >
                                            { ( items.item.title.length > titleMaxLength )
                                                ? items.item.title.slice(0, titleMaxLength).concat("...")
                                                : items.item.title
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={ item => String(item.key) }
                />
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    titleTextStyle: {
        fontFamily: 'meiryoUI',
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.noAccentColor,
    },
});

export default Tab3Screen;
