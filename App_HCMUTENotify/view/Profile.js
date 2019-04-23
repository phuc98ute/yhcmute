import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,Dimensions,ScrollView,AsyncStorage
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Config from 'react-native-config';

const Screen = Dimensions.get('window')
const SideMenuWidth = 300
const RemainingWidth = Screen.width - SideMenuWidth



export default class Profile extends Component {

  constructor() {
    super()
    this.state={
        fullName:"",
        studentCode:"",
        phone:"",
        email:"",
        image:"",
    }
}

  componentDidMount()
  {
    console.log("Da vao DidMount")
    AsyncStorage.getItem('access_token', (err, result) => {
      if (result != null) {
        console.log(result)
        var Response = fetch(`${Config.API_URL}/api/v1/users/logged`,
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
          .then(ResponseJson =>  {console.log(ResponseJson.isSuccess)
            {ResponseJson.isSuccess == "true" ? 
            this.setState({fullName:ResponseJson.data.people.fullName,
            studentCode:ResponseJson.data.people.studentCode,
            phone:ResponseJson.data.people.phone,
            email:ResponseJson.data.people.email,
            image:ResponseJson.data.people.image,
            })
             : null}
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
  render() {
    return (
      
      <View >
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Tài khoản</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{ height: Screen.height - 50 }}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={ this.state.image==null ? { uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' } : {uri:this.state.image}} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.fullName}</Text>
              <Text style={styles.info}>Mã số sinh viên: {this.state.studentCode}</Text>
              <Text style={styles.info}>SĐT: {this.state.phone}</Text>
              <Text style={styles.info}>Email: {this.state.email}</Text>
              <Text style={styles.description}> Hoạt động đã tham gia Hoạt động đã tham gia Hoạt động đã tham gia Hoạt động đã tham gia
              Hoạt động đã tham gia Hoạt động đã tham gia Hoạt động đã tham gia Hoạt động đã tham gia Hoạt động đã tham gia </Text>

              {/* <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});