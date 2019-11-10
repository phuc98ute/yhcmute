import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Dimensions,
  Platform,
  DeviceEventEmitter,
    Alert,
} from "react-native";
import styles from '../css/styles';
import AsyncStorage from '@react-native-community/async-storage';
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { ProgressDialog } from "react-native-simple-dialogs";
import { Header, Title, Body } from "native-base";
import NetInfo from "@react-native-community/netinfo";
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar = deviceWidth * 0.1;
const bottomFlex = logoHeight < 0 ? 0 : logoHeight;
const fontSize = logoHeight < 0 ? 11 : 13;

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
  }
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            showLoading: false,
            showLoading2: false,
            topic:[]
        };
    }
    componentDidMount() {
        this._autoLogin();


        // NetInfo.fetch().then(state => {
        //     ToastAndroid.show("Use: "+ state.type,ToastAndroid.LONG);
        //     ToastAndroid.show("Is connected: "+ state.isConnected,ToastAndroid.LONG);
        // });


    }
  //Automatically log in if the token is still valid
  _autoLogin() {
    AsyncStorage.getItem('access_token', (err, result) => {
      if (result != null) {
        console.log(result)
        let decode = jwtDecode(result)
        let current_time = new Date().getTime() / 1000;
        if (current_time < decode.exp) { this.props.navigation.navigate("Activity", {}) }
      }
    }
    )
  }
    componentWillUnmount() {
        this.notificationListener;
        this.notificationOpenedListener;
    }
    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log('fcmToken:', fcmToken);
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    async createNotificationListeners(topic) {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        console.log('========================================== TOPIC')
        console.log(topic)
        topic.map(item => (
            firebase.messaging().subscribeToTopic(item)
        ));
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            console.log('onNotification:');

            const localNotification = new firebase.notifications.Notification({
                sound: 'default',
                show_in_foreground: true,
            })
                .setSound('default')
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setBody(notification.body)
                .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
                //.android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(firebase.notifications.Android.Priority.High);

            firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
        });

        const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
            .setDescription('Demo app description')
            .setSound('default');
        firebase.notifications().android.createChannel(channel);

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log('onNotificationOpened:');
            Alert.alert(title, body)
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log('getInitialNotification:');
            //Alert.alert(title, body)
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log("JSON.stringify:", JSON.stringify(message));
        });
    }


    _signIn = () => {

  }

  handleClick = () => {
    if (this.state.username != "" && this.state.pwd != "") {
      this.setState({ showLoading: true });
      var { navigate } = this.props.navigation;
      const { username, pwd } = this.state;
      var res = fetch(
        `${Config.API_URL}/login?username=${username}&password=${pwd}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => {
          this.setState({ showLoading: false });

          let accessToken = res.headers.get("authorization");

          let decode = jwtDecode(accessToken);

          const tokenIndex = accessToken.lastIndexOf(" ") + 1;
          let token = accessToken.substr(tokenIndex);
          if (token) {
            AsyncStorage.setItem("access_token", token);

            fetch(`${Config.API_URL}/api/v1/user/current`,
                  {
                      method: 'GET',
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + token,
                      },

                  })
                  .then(Response => Response.json()
                  )
                  .then(ResponseJson =>  {

                      AsyncStorage.setItem('Account', JSON.stringify(ResponseJson));
                      const subscribeUriKhoa = ResponseJson.student.aClass.faculty.topicUri.replace('/topics/', '');
                      const subscribeUriLop = ResponseJson.student.aClass.faculty.classes[0].topicUri.replace('/topics/', '');
                      this.state.topic.push(subscribeUriKhoa);
                      this.state.topic.push(subscribeUriLop);
                      this.state.topic.push("yhcmute");
                        console.log('this.state.topic',this.state.topic)
                      console.log('Asynstor login',AsyncStorage);
                      AsyncStorage.setItem('topic',JSON.stringify(this.state.topic) );
                      AsyncStorage.getItem('topic',(err,result)=>{
                          console.log('result')
                          console.log(result)
                      })
                      //Listen TOPIC
                      this.checkPermission();
                      this.createNotificationListeners(this.state.topic); //add this line
                      firebase.notifications().getInitialNotification()
                          .then((notificationOpen: NotificationOpen) => {
                              if (notificationOpen) {
                                  // App was opened by a notification
                                  // Get the action triggered by the notification being opened
                                  const action = notificationOpen.action;
                                  // Get information about the notification that was opened
                                  const notification: Notification = notificationOpen.notification;
                              }
                          });
                  })
                  .catch(error => {
                      console.log(error);
                  });

              //----------------------------------------------------
            this.props.navigation.navigate("Activity", {});

          }
        })
        .catch(err => {
          console.log("ERR", err);
          this.setState({showLoading:false});
          ToastAndroid.show(
            "Lỗi đăng nhập!",
            ToastAndroid.LONG
          );
        });
    }
    else {
      ToastAndroid.show(
        "Chưa nhập thông tin!",
        ToastAndroid.LONG
      );
    }
  };
  _forgotPwd = () => {
      console.log("FOrgetPass");
      this.props.navigation.navigate("ForgetPass", {});
  }
  render() {
    var { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
        <View style={{ flex: 7, justifyContent: 'flex-end' }}>
          <View style={styles.statusbar}>
            <View style={{ height: '14%' }}>
              <Header style={{ backgroundColor: '#CCCCCC' }}
                androidStatusBarColor="#CCCCCC">
                <Body style={styles.bodyStatus}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={styles.logoStatusbar} source={require("../source/logodoan.png")}></Image>
                    <Title style={styles.titleStatusbar}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                    <Image style={styles.logoStatusbar} source={require("../source/logohoi.png")}></Image>
                  </View>
                </Body>
              </Header>
            </View>

            <View
              style={styles.mainContainer}
            >
              <Image
                source={require("../source/banner.png")}
                style={{ width: deviceWidth, height: (deviceWidth) * 0.23 }}
              />
            </View>
            <View style={{
              alignItems: 'center',
              height: '31%',
              justifyContent: 'flex-end',
            }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.logo}
                  source={require("../source/logodoan.png")}
                />
                <Image
                  style={styles.logo}
                  source={require("../source/logohoi.png")}
                />
              </View>
            </View>
            <View style={{ height: '35%', marginBottom: 5, justifyContent: 'flex-start' }}>
              <Text style={{
                color: "#0000DD",
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: "center",
                // marginTop: 30,
                opacity: 1
              }}>
                Y_HCMUTE
                </Text>
              <Text style={{
                color: "#0000DD",
                fontSize: fontSize + 4,
                textAlign: "center",
                fontWeight: 'bold',
              }}>
                ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI
                </Text>
            </View>
          </View>
        </View>


        <KeyboardAvoidingView style={{ flex: 3 }}>
          <View style={{ alignItems: 'center', height: deviceHeight * 0.3, backgroundColor: 'FFFFFF' }}>
            <TextInput
              style={{
                width: '98%',
                height: deviceHeight * 0.07,
                backgroundColor: "rgba(144, 164, 174  ,0.7)",
                color: "#546E7A",
                marginBottom: 10,
                borderRadius: 30,
                textAlign: 'center',
              }}
              placeholder="Nhập tên đăng nhập hoặc Email"
              placeholderTextColor="rgba(84, 110, 122,0.8)"
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={username => this.setState({ username })}
              onSubmitEditing={() => this.refs.txtPassword.focus()}
            />
            <TextInput
              style={{
                width: '98%',
                height: deviceHeight * 0.07,
                backgroundColor: "rgba(144, 164, 174  ,0.7)",
                color: "#546E7A",
                marginBottom: 10,
                borderRadius: 30,
                textAlign: 'center',
              }}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="rgba(84, 110, 122,0.8)"
              onChangeText={pwd => this.setState({ pwd })}
              returnKeyType="go"
              secureTextEntry
              autoCorrect={false}
              ref={"txtPassword"}
            />
            <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.handleClick}
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Signup", {})}
              >
                <Text style={styles.buttonText}>Đăng kí</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonForget}
              onPress={this._forgotPwd}
            >
              <Text>Quên mật khẩu ?</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
        <ProgressDialog
          style={{ borderRadius: 20 }}
          visible={this.state.showLoading}
          title="Đang kết nối đến server"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          animationType="slide"
          message="Vui lòng chờ trong giây lát ..."
        />
        <ProgressDialog
          style={{ borderRadius: 20 }}
          visible={this.state.showLoading2}
          title="Đang chờ kết nối mạng"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          animationType="slide"
          message="Vui lòng mở kết nối mạng Internet ..."
        />
      </View>
    );
  }
}

