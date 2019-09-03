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
import { AsyncStorage } from "react-native";
// import { Icon } from "react-native-elements";
//import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from "jwt-decode";
import Config from "react-native-config";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

import Icon from 'react-native-vector-icons/Entypo';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;

export default class Activity extends Component {
  static navigationOptions = {
      title:'Các hoạt động đã đăng kí',
      headerMode:'screen'
  };
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
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
            activytyName: item.actName,
            activityContent: item.actContent,
            activityId: item.id
          })
        }
      >
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.photo} />
            <View style={styles.container_text}>
              <Text style={styles.title}>
                {item.actName}
              </Text>
              <Text style={styles.description}>
                {Moment(item.startDate).format('MMMM Do, YYYY H:mma')}
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
componentWillUnmount() {
  // this.isCancelled = true;
}
  componentDidMount() {
    AsyncStorage.getItem('access_token', (err, result) => {
      console.log('Get data !');
      console.log(result);
      if (result != null) {
        console.log(result)
        //var Response = fetch(`${Config.API_URL}/api/v1/people/activities/registration`,
        var Response = fetch(`${Config.API_URL}/api/v1/people/activities/registration?aStatus=PIP`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + result,
            },

          })
          .then(Response => Response.json()
          )
          .then(ResponseJson => {
            console.log(ResponseJson)
            this.setState({
              dataSource: ResponseJson.data,
              isLoading: false,

            });
            console.log(ResponseJson.data)
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    )
    
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
        <Container >
          {/* <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Hoạt động đã đăng kí</Title>
            </Body>
          </Header> */}
           <Header style={{ backgroundColor: '#CCCCCC' }}
                        androidStatusBarColor="#CCCCCC">
                        <Body style={{ alignItems: 'center', flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logodoan.png")}></Image>
                                <Title style={{ flex: 8, marginTop: 20, justifyContent: 'center', color: '#0000DD', fontWeight: 'bold', fontSize: 13 }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                                <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logohoi.png")}></Image>
                            </View>

                        </Body>
                    </Header>
                    <Header style={{ backgroundColor:"#FFFFFF" }}
                            androidStatusBarColor="#CCCCCC">
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.openDrawer()}>
                                {/* <Icon name="menu" color="black" /> */}
                                <Icon name="menu" size={30} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{justifyContent: 'center', color: 'black'}}>Hoạt động đã đăng kí</Title>
                        </Body>
                        
                    </Header>
          <View>
            <View style={{ height: '93%' }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
              <ConfirmDialog
                style={{borderRadius:20}}
                title={this.state.activytyName}
                // message={this.state.activityContent}
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({ dialogVisible: false })}
                positiveButton={{
                  title: "OK",
                  onPress: () => {
                    this.setState({ dialogVisible: false })
                  }
                }}

              >
              <ScrollView style={{height:'80%'}}>
                <Text>
                  {this.state.activityContent}
                </Text>
              </ScrollView>
              </ConfirmDialog>
            </View>

          </View>
          {/* </Content> */}
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
