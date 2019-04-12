import React, {Component} from 'react'
import {StyleSheet,Alert,View,Image,TouchableWithoutFeedback,StatusBar,
TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView,ScrollView,Dimensions} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

export default class signingactivity extends Component{
    static navigationOptions={
        title:'Đăng kí thông tin tài khoản',
        headerMode:'screen'
    };
    render (){
        const screenHeight = Dimensions.get('window').height;
        return (
            
            <Container >
                    <Header style={{backgroundColor:"#3366CC"}}>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Đăng kí chương trình</Title>
                        </Body>
                        <Right />
                    </Header>
                <View>
                    <View style={styles.cover}></View>
                    {/* <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} /> */}
                    <View style={{ height: '61%' }}>
                        <ScrollView>
                            <Text style={styles.name}>Masetering IT 2019</Text>
                            <Text style={styles.info}>Khoa Công nghệ Thông tin/ Cấp trường</Text>
                            <Text style={styles.description}>Chiếc Macbook Air được mình sử dụng trong bài test này là phiên bản trang bị 16 GB RAM và có bộ nhớ trong 512 GB. Máy được trang bị viên pin 50,3 Wh và theo công bố của Apple, viên pin này đủ cho nó có thể lướt web không dây trong 12 tiếng và đạt 13 tiếng xem phim liên tục thông qua iTunes. Có thể vì điều kiện dùng khác, nên số liệu mà mình thu được sau những bài test không được như những gì mà nhà sản xuất nói.
    
    Kết quả kiểm tra chứng minh bạn có thể sử dụng Macbook Air 2018 để làm việc văn phòng (lướt web, gõ văn bản và dùng một xíu Photoshop) cỡ 6 tiếng, xem phim online hơn 6 tiếng, trong khi thời gian mà bạn có thể dùng máy để chỉnh ảnh qua PTS là khoảng hơn 5 tiếng rưỡi một chút. Dưới đây sẽ là những thông tin chi tiết hơn về quy trình đánh giá pin và một số dữ liệu cụ thể về thời gian sử dụng pin của Macbook Air 2018, mời các bạn theo dõi.
    
    Một số lưu ý về thông số của máy trong quá trình test:
    
    * Độ sáng màn hình luôn duy trì mức 100%, độ sáng bàn phím 100%
    * Môi trường thử nghiệm: ngoài trời và phòng máy lạnh, nhiệt độ dao động từ 27℃ - 31℃
    * Các phần mềm sử dụng trong quá trình thử nghiệm: Safari, Evernote và Photoshop
    
    Quy trình thử nghiệm:
    
    Sạc đầy pin cho máy, tiến hành lướt làm việc (Gõ văn bản + Lướt Web + PTS nhẹ) cho đến khi hết pin và tương tự như vậy đối với các tác vụ khác.
    
Thời gian làm việc văn phòng - 6 tiếng </Text>

                        </ScrollView>
                    </View>
                    <View style={{flex:1,flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Đăng kí ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Trở lại</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </Container>
        )
    }

}

const styles= StyleSheet.create({
    title:{
        color:'#3366CC',
        fontSize:30,
        textAlign:'center',
        marginTop:30,
        opacity:0.9
    },
    inforContainer:{
        //position:'absolute',
        left:0,
        right:0,
        bottom:0,
        height:250,
        padding:20,
        //backgroundColor:'red'
    },
    input:{
        marginTop:20,
       height:40,
       backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
       color:'#546E7A',
       //paddingHorizontal:10,
    },
    buttonContainer:{
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#3366CC',
        paddingVertical:5,
        width:'48%',
        margin:5
        
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:18
    },
    doropDownModal:{
        height:40,
        marginTop:20,
        backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
        color:'#546E7A',
        fontSize:25
    },
    cover:{
        backgroundColor: "#00BFFF",
        height:200,
        borderRadius:10,
        margin:10,
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
        fontSize:28,
        color: "#696969",
        fontWeight: "600",
        textAlign: 'center'
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10,
        textAlign:'center',
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
})
