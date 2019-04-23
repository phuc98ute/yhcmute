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
  Dimensions,
} from "react-native";
import { AsyncStorage } from "react-native";
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const deviceWidth = Dimensions.get('window').width;

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
    
  };
  componentDidMount(){
    AsyncStorage.getItem('access_token', (err, result) => {
      if(result!=null){
          console.log(result)
          let decode = jwtDecode(result)
          let current_time=new Date().getTime()/1000;
          if(current_time < decode.exp){this.props.navigation.navigate("Activity",{})}
        }})
  
  }
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
  _signIn=()=>
  {
    
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
          console.log(token)
          AsyncStorage.setItem("access_token", token);
          AsyncStorage.setItem("username",this.state.username);
          AsyncStorage.setItem("pass",this.state.pwd);
          console.log(AsyncStorage.getItem("access_token"));
          console.log("Sucess");
          this.props.navigation.navigate("Activity",{});
          
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
            <View style={{ backgroundColor: "#FFFFFF", flex: 1,flexDirection:'column' }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  flex: 2,
                  marginTop:'2%'
                }}
              >
                <Image
                  source={require("../source/banner.png")}
                  style={{width: deviceWidth}}
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
                <View style={{flex:2}}>
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
                </View>
                <View style={{flex:2}}>
                  <View style={{flexDirection: 'row', height: 50, padding:5 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1, backgroundColor: "#3366CC", borderRadius: 10
                        , textAlign: "center", margin: 5, height: 50
                      }}
                      onPress={this.handleClick}
                    >
                      <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <GoogleSigninButton
                      style={{ flex: 1, margin: 5, height: 50 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn}
                      disabled={this.state.isSigninInProgress} />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate("Signup", {})}
                  >
                    <Text style={styles.buttonText}>Đăng kí</Text>
                  </TouchableOpacity>
                </View>
                <ProgressDialog
                  style={{borderRadius:10}}
                  visible={this.state.showLoading}
                  title="Đang kết nối đến server"
                  activityIndicatorColor="blue"
                  activityIndicatorSize="large"
                  animationType="slide"
                  message="Vui lòng chờ trong giây lát ..."
                />
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
  },
  logoContainer: {
     alignItems: "center",
     justifyContent: "center",
    // paddingTop: "30%",
    flex: 5,
  },
  logo: {},
  banner: {
    alignItems: "center",
    justifyContent: "center",
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
    //position: "absolute",
    //flex:4,
    //padding: 20
    //backgroundColor:'red'
    height:250,
  },
  input: {
    //flex:1,
    width:'100%',
    height:50,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A",
    margin:5,
    borderRadius:20,
    
  },
  buttonContainer: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#3366CC",
    //flex:1,
    alignItems:"center",
    height:50,
    marginTop:20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  }
});
