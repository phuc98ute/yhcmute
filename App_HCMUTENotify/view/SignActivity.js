import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  ToastAndroid,BackHandler,
  Dimensions,
  ScrollView
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Statusbar from "../sidebar/statusbar";
// import { Icon } from "react-native-elements";
//import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from "jwt-decode";
import Config from "react-native-config";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;

export default class Activity extends Component {
  static navigationOptions = {
      title:'Các hoạt động đã đăng kí',
      headerMode:'none',
      headerBackTitleVisible:false,
  };
  constructor() {
    super();
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      dataSource: [],
      isLoading: true,
        studentId:"",
        activytyName:"",
        activityContent:"",
        activityId:"",

    };
  }

  renderItem = ({ item }) => {
    Moment.locale('en');
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "column", marginBottom: 3 }}
        onPress={() =>
          this.setState({
            dialogVisible: true,
            activytyName: item.activity.name,
            activityContent: item.activity.activityDescription.content,
            activityId: item.activity.id
          })
        }
      >
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <View style={styles.container}>
            <Image source={ item.activity.activityDescription.coverImage===null ?  require('../source/noimageBackground.png') : {uri:item.activity.activityDescription.coverImage}} style={styles.photo} />
            <View style={styles.container_text}>
              <Text style={styles.title}>
                {item.activity.name}
              </Text>
              <Text style={styles.description}>
                {Moment(item.startDate).format('l')}
              </Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View>
        style={{ height: 1, width: "100%", backgroundColor: "black" }}
      </View>
    );
  };

  componentDidMount() {
      AsyncStorage.getItem('Account',(err,result)=>{
          var temmp= JSON.parse(result)
          console.log(temmp)
          this.setState({'studentId':temmp.student.id})

    AsyncStorage.getItem('access_token', (err, result) => {
      console.log('Get data !');
      if (result != null) {
        var Response = fetch(`${Config.API_URL}/api/v1/activity/getActivitiesRegistration?page=0&size=20&studentId=${this.state.studentId}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + result,
            },
          })
          .then((Response) => Response.json()
          )
          .then(ResponseJson => {
            console.log(ResponseJson)
                  console.log("totalItems")
                  this.setState({
                      dataSource: ResponseJson.result,
                      isLoading: false,

                  });
          })
          .catch(error => {
            console.log(error);
          });
      }
    })
      });
    
  }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate("Activity",{});
        return true;
    }

  
  render() {
    var { navigate } = this.props.navigation;
    return (
      this.state.isLoading
        ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <ActivityIndicator size="large" color="330066" animating />
        </View>
        :
          <Container style={{height:deviceHeight}}>
              <Statusbar></Statusbar>
              <Header style={{backgroundColor: "#FFFFFF"}}
                      androidStatusBarColor="#CCCCCC">
                  <Left>
                      <Button
                          transparent
                          onPress={() => this.props.navigation.openDrawer()}>
                          <Icon name="menu" size={30} color="black"/>
                      </Button>
                  </Left>
                  <Body>
                      <Title style={{justifyContent: 'center', color: 'black'}}>Hoạt động đã đăng kí</Title>
                  </Body>

              </Header>
              <View>
                  <View style={{height: deviceHeight*0.8}}>
                      {
                          (this.state.dataSource && this.state.dataSource.length > 0) ?
                              <FlatList
                                  data={this.state.dataSource}
                                  renderItem={this.renderItem}
                                  keyExtractor={(item, index) => index.toString()}
                              />
                              :
                              <Text> Chưa đăng ký hoạt động nào </Text>
                      }

                      <ConfirmDialog
                          style={{borderRadius: 20}}
                          title={this.state.activytyName}
                          // message={this.state.activityContent}
                          visible={this.state.dialogVisible}
                          onTouchOutside={() => this.setState({dialogVisible: false})}
                          positiveButton={{
                              title: "OK",
                              onPress: () => {
                                  this.setState({dialogVisible: false})
                              }
                          }}

                      >
                          <ScrollView style={{height: deviceHeight*0.6}}>
                              <Text>
                                  {this.state.activityContent}
                              </Text>
                          </ScrollView>
                      </ConfirmDialog>
                  </View>
              </View>
          </Container>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});
