import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { LoginScreen, SignupScreen } from "../screenName";
import { AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import Main from "./main";
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
export default class Login extends Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    //this.loadAPI();
    //const token = await AsyncStorage.getItem('token');
    //if(issets token){
    //get userinfo
    //}
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: "",
      showLoading: false
    };
  }

  handleClick = () => {
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
          "Conten-Type": "application/json"
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
          AsyncStorage.setItem("access_token", token);
          console.log(AsyncStorage.getItem("access_token"));
          console.log("Sucess");
          
          this.props.navigation.push("Activity");
          
        }
      })
      .catch(err => {
        console.log("ERR", err),
          ToastAndroid.show(
            "Lỗi đăng nhập!",
            ToastAndroid.LONG
          );
      });
  };
  render() {
    var { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  height: "15%",
                  paddingTop: "2%"
                }}
              >
                <Image
                  source={require("../source/banner.png")}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require("../source/logodoan.png")}
                />
                <Text style={styles.title}>
                  QUẢN LÝ HOẠT ĐỘNG ĐOÀN HỘI HCMUTE
                </Text>
              </View>

              <View style={styles.inforContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter username/email"
                  placeholderTextColor="rgba(84, 110, 122,0.8)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={username => this.setState({ username })}
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="rgba(84, 110, 122,0.8)"
                  onChangeText={pwd => this.setState({ pwd })}
                  returnKeyType="go"
                  secureTextEntry
                  autoCorrect={false}
                  ref={"txtPassword"}
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  // onPress={()=>
                  //     navigate("Main",{})
                  // }>
                  onPress={this.handleClick}
                >
                  <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => navigate("Second", {})}
                >
                  <Text style={styles.buttonText}>SIGN UP</Text>

                  <ProgressDialog
                    visible={this.state.showLoading}
                    title="Loading"
                    activityIndicatorColor="blue"
                    activityIndicatorSize="large"
                    animationType="slide"
                    message="Please, wait..."
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //backgroundColor:'#FFFFFF',
    backgroundColor: "red"
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30%",
    //flex: 1,
    flexDirection: "column"
  },
  logo: {},
  banner: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10
  },
  title: {
    color: "#21618C",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    opacity: 0.9
  },
  inforContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    padding: 20
    //backgroundColor:'red'
  },
  input: {
    marginTop: 20,
    height: 40,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A"
    //paddingHorizontal:10,
  },
  buttonContainer: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#3366CC",
    paddingVertical: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18
  }
});
