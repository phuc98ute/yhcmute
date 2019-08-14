import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableWithoutFeedback,StatusBar,
    TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import { AsyncStorage } from 'react-native'
import {Link} from 'react-router-native'
import { Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from 'jwt-decode'
import Config from 'react-native-config'
export default class Main extends Component{
    static navigationOptions={
        header:null
    };
    componentWillMount(){
        this.loadAPI();
        //const token = await AsyncStorage.getItem('token');
        //if(issets token){
            //get userinfo
            
        //}
    };
    componentDidMount(){

    }
    componentWillReceiveProps(newProps){
        //if(success featch user info){
            //goto main container
        //}
    }
    render(){
        var {navigate} = this.props.navigation;
        return (
            <View>
            <View style={{height:620,backgroundColor:"white"}}>
                <Text>Main Activity</Text>
                <Icon type="Entypo" name="router" style={{height:50,width:50}}/>
            </View>
            <View style={{ height: '6%', backgroundColor: '#3366CC', marginBottom: 1, flexDirection: "row", justifyContent: "space-evenly", paddingBottom: 0 }}>
                    <TouchableOpacity onPress={() => navigate("Activity", {})}>
                        <Icon type='Entypo' name="router" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate("SignActivity", {})}>
                        <Icon type='Entypo' name="phone" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate("Second", {})}>
                        <Icon type='Entypo' name="radio" size={30} color="white" />
                    </TouchableOpacity>

                </View>
        </View>
        )
    }

    loadAPI (){
        var response = fetch (`${Config.API_URL}:8080/login?username=admin&password=admin`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Conten-Type':'application/json',
            }
        })
        .then(res => {
            console.log('RES', res.headers.get('authorization'))
             let accToken=res.headers.get('authorization')
             let decode=jwtDecode(accToken)
             console.log(decode)
        })
        .catch(err => {console.log('ERR', err)});
    }

    
    // async function loadAsyncStorage(item) {
    //     try {
    //     const value = await AsyncStorage.getItem(item);
    //         return value;
    //     } catch (error) {
    //         // Handle errors here
    //     }
    // }
}
