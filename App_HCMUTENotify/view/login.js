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
} from "react-native";
import { AsyncStorage } from "react-native";
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { ProgressDialog } from "react-native-simple-dialogs";
import { Header, Title, Body } from "native-base";
import NetInfo from "@react-native-community/netinfo";
// import firebase from 'react-native-firebase';
 
import StompWS from 'react-native-stomp-websocket';
// import BackgroundTask from 'react-native-background-task';
import pushNotifications from './pushNotifications'
import PushNotificationAndroid from 'react-native-push-notification'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar = deviceWidth * 0.1;
const bottomFlex = logoHeight < 0 ? 0 : logoHeight;
const fontSize = logoHeight < 0 ? 11 : 13;
pushNotifications.configure();

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'

  }
  ws_url = "ws://192.168.1.55:8080/ws";
  subscribeToWebsocket = (url, channels) => {
    const stompClient = StompWS.client(url);
    stompClient.connect({}, () => {
      channels.forEach(channel => {
        stompClient.subscribe(channel.route, channel.callback);
      })
    });
  };
  handleReceiveWs= (msg)=>{

    var temp=JSON.parse(msg.body);
    console.log(temp);
    pushNotifications.localNotification(`${temp.status=='1'?"Thanh cong":"That bai"}`,`Xin chao ${temp.student.fullName}`,this.props)
    console.log("Da nhan thong bao")
  };
  componentWillMount() {
    // (function() {
    //   // Register all the valid actions for notifications here and add the action handler for each action
    //   PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);
    //   DeviceEventEmitter.addListener('notificationActionReceived', function(e){
    //     console.log ('notificationActionReceived event received: ' + e);
    //     const info = JSON.parse(e.dataJSON);
    //     if (info.action == 'Accept') {
    //       // Do work pertaining to Accept action here
    //     } else if (info.action == 'Reject') {
    //       // Do work pertaining to Reject action here
    //     }
    //     // Add all the required actions handlers
    //   });
    // })();
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


  componentDidMount() {
    this.subscribeToWebsocket(this.ws_url, [
      {route: '/topic/newUser', callback: this.handleReceiveWs}
    ]);

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    console.log(deviceHeight)
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: "",
      showLoading: false,
      showLoading2: false
    };
  }
  
  _signIn = () => {

  }
  handleClick = () => {
    if (this.state.username != "" && this.state.pwd != "") {
      this.setState({ showLoading: true });
      var { navigate } = this.props.navigation;
      const { username, pwd } = this.state;
      console.log(username);
      console.log(pwd);
      console.log(Config.API_URL);
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
          console.log("RES", res.headers.get("authorization"));
          let accessToken = res.headers.get("authorization");
          let decode = jwtDecode(accessToken);
          console.log(decode);
          const tokenIndex = accessToken.lastIndexOf(" ") + 1;
          let token = accessToken.substr(tokenIndex);
          if (token) {
            console.log(token)
            AsyncStorage.setItem("access_token", token);
            AsyncStorage.setItem("username", this.state.username);
            AsyncStorage.setItem("pass", this.state.pwd);
            console.log(AsyncStorage.getItem("access_token"));
            console.log("Sucess");
            this.props.navigation.navigate("Activity", {});

          }
        })
        .catch(err => {
          console.log("ERR", err)
          // ToastAndroid.show(
          //   "Lỗi đăng nhập!",
          //   ToastAndroid.LONG
          // );
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
    // ToastAndroid.show("Forgot pwd")
  }
  render() {
    var { navigate } = this.props.navigation;
    return (
     
      <View style={{ flex: 1 }}>
        <View style={{ flex: 7, justifyContent: 'flex-end' }}>
          <View style={{ height: deviceHeight * 0.7 }}>
            <View style={{ height: '14%' }}>
              <Header style={{ backgroundColor: '#CCCCCC' }}
                androidStatusBarColor="#CCCCCC">
                <Body style={{ alignItems: 'center', height: '100%', marginTop: '3%' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logodoan.png")}></Image>
                    <Title style={{ flex: 8, marginTop: 20, color: '#0000DD', fontWeight: 'bold', fontSize: fontSize }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                    <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logohoi.png")}></Image>
                  </View>
                </Body>
              </Header>
            </View>

            <View
              style={{
                height: '20%',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
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
                  style={{
                    width: deviceHeight * 0.15,
                    height: deviceHeight * 0.15,
                  }}
                  source={require("../source/logodoan.png")}
                />
                <Image
                  style={{
                    width: deviceHeight * 0.15,
                    height: deviceHeight * 0.15,
                  }}
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
                // marginBottom: 20,
                fontWeight: 'bold',
                // opacity: 0.9

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
                style={{
                  borderRadius: 30,
                  backgroundColor: "#3366CC",
                  alignItems: "center",
                  height: deviceHeight * 0.05,
                  padding: 3,
                  flex: 1,
                  marginRight: '1%'
                }}
                onPress={this.handleClick}
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  backgroundColor: "#3366CC",
                  alignItems: "center",
                  height: deviceHeight * 0.05,
                  padding: 3,
                  flex: 1,
                  marginLeft: '1%'
                }}
                onPress={() => this.props.navigation.navigate("Signup", {})}
              >
                <Text style={styles.buttonText}>Đăng kí</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ height: deviceHeight * 0.05, alignItems: "center", marginTop: '2%', }}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
    height: deviceHeight * 0.3,
    marginBottom: 10,
  },
  logo: {

    width: deviceHeight * 0.15,
    height: deviceHeight * 0.15,
    marginTop: 25,
  },
  banner: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,

  },
  title: {
    color: "#0000DD",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 30,
    opacity: 1
  },
  inforContainer: {
    height: deviceHeight * 0.4,
    backgroundColor: "#FFFFFF"
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A",
    marginBottom: 10,
    borderRadius: 30,
    textAlign: 'center',

  },
  buttonContainer: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "#3366CC",
    alignItems: "center",
    height: 30,
    padding: 3,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,

  },
  btnContainer: {
    backgroundColor: "white",
  },
});
