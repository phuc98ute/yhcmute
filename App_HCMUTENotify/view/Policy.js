import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity, Dimensions, ScrollView, FlatList, ToastAndroid, BackHandler,Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem } from "native-base";
import Config from 'react-native-config';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {Rating} from 'react-native-ratings'
import Moment from 'moment';
const Screen = Dimensions.get('window')
const SideMenuWidth = 300;
const RemainingWidth = Screen.width - SideMenuWidth;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;

export default class Policy extends Component {
    constructor(){
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={

        }
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        AsyncStorage.getItem('access_token', (err, result) => {
            if(result!=null)
            this.props.navigation.navigate("Activity",{});
            else this.props.navigation.navigate("Login",{});
        })

        //this.props.back();
        return true;
    }

    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <ScrollView style={styles.home}>

                        <Text style={{fontSize: 15, fontWeight: 'bold',textAlign: "center",marginTop:5}}>ĐIỀU KHOẢN SỬ DỤNG  {"\n"}</Text>
                        <Text> Vui lòng đọc ký Thỏa Thuận Sử Dụng ("Thỏa Thuận") trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả hoặc bất kỳ phần nào của ứng dụng "YHCMUTE" (bao gồm các nội dung chia sử, các file và ác tài liệu liên quan)
                        ) hoặc sử dụng các dịch vụ do Đoàn trường Đại học Sư phạm Kỹ thuật cung cấp để kết nối đến Ứng dụng. Bạn chấp thuận và đồng ý ràng buộc bởi các quy định và điều kiện trong Thỏa Thuận này khi thực hiện các thao tác trên đây.
                            Trường hợp bạ không đồng ý với bất kỳ điều khoản sử dụng nào của chúng tôi (phiên bản này và các phiên bản cập nhật), bạn vui lòng không tải, cài đặt, sử dụng Ứng dụng hoặc tháo gỡ ứng dụng ra khỏi thiết bị của bạn.
                            {"\n\n"}
                            <Text style={{fontWeight: 'bold'}}>1. Cập nhật</Text>
                            {"\n\n"}
                            Thỏa thuận này có thể được cập nhật thường xuyên bởi đơn vị phát hành, phiên bản cập nhật sẽ được chúng tôi công bố tại website tuoitre.hcmute.edu.vn. Phiên bản cập nhật sẽ thay thế cho các quy đinh và điều kiện
                            trong thỏa thuận ban đầu. Bạn có thể truy cập ứng dụng hoặc vào website trên đây để xem nội dung chi tiết của phiên bản cập nhật.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>2. Giới thiệu về ứng dụng</Text>
                            {"\n\n"}
                            YHCMUTE là ứng dụng quản lý hoạt động dành cho sinh viên và đoàn trường đại học Sư phạm Kỹ thuật thành phố Hồ Chí Minh. Ứng dụng tạo môi trường tương tác cao giữa sinh viên và nhà trường giúp cho việc trao đổi thông tin và quản lý
                            sự phát triển của nhà trường.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>3. Quyền sở hữu ứng dụng</Text>
                            {"\n\n"}
                            Ứng dụng này được phát triển và sở hữu bởi Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh, tất cả các quyền sở hữu trí tuệ liên quan đến ứng dụng (bao gồm nhưng không giới hạn mã nguồn, hình ảnh, dữ liệu, thông tin,
                            nội dung chứa đựng trong ứng dụng; các sửa đổi, bổ sung, cập nhật của ứng dụng) và các tài liệu hướng dẫn liên quan (nếu có) sẽ thuộc quyền sở hữu duy nhất của Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh,
                            không cá nhân tổ chức nào được quyền sao chép tái tạo, phân phối hoặc hình thức khác xâm phạm tới quyền của chủ sở hữu nếu không có sự đồng ý và cho phép bằng văn bản của Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>4. Tài khoản</Text>
                            {"\n\n"}
                            Để sử dụng ứng dụng bạn phải có một tài khoản thuộc trường. Khi đăng kí tài khoản sử dụng ứng dụng là bạn đã đồng ý với điều khoản sử dụng do đơn vị phát hành đưa ra. Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông
                            tin tài khoản bạn đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch nào, hoặc sai phạm sẽ phải chịu theo sự quyết định của đơn vị phát hành.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>5. Sử dụng ứng dụng</Text>
                            {"\n\n"}
                            Bạn có quyền sử dụng ứng dụng và các dịch vụ khác mà chúng tôi cung cấp, tuy nhiên việc sử dụng phải tuân thủ theo quy định của đơn vị phát hành, không bao gồm các hành vi sau đây nếu không có sự đồng ý bằng văn bản của đơn
                             vị phát hành: {"\n"}
                             + Sao chép, chỉnh sửa tái tạo, tạo ra sản phẩm mới hoặc phiên bản phát sinh trên cơ sở ứng dụng này;{"\n"}
                             + Bán, chuyển giao, cấp quyền lại, tiết lộ hoặc hình thức chuyển giao khác hoặc đưa một phần hoặc toàn bộ ứng dụng cho bất kỳ bên thứ 3{"\n"}
                             + Sử dụng ứng dụng để cung cấp dịch vụ cho bất ký bên thứ 3{"\n"}
                             + Di chuyển, xóa bỏ, thay đổi bất kỳ thông báo chính đáng, hoặc dấu hiệu nào của ứng dụng (bao gồm nhưng không giới hạn các tuyên bố về bản quyền){"\n"}
                             + Thiết kế lại, biên dịch, tháo gỡ, chỉnh sửa, đảo lộn thiết kế của ứng dụng hoặc nội dung ứng dụng{"\n"}
                             + Thay đổi hoặc hủy bỏ trạng thái ban đầu của ứng dụng{"\n"}
                             + Sử dụng ứng dụng để thực hiện bất kỳ hành động gây hại cho hệ thống an ninh nào (bao gồm cả ứng dụng này){"\n"}
                             + Đăng nhập và sử dụng ứng dụng bằng một phần mềm tương thích của bên thứ ba hoặc hệ thống không được phát triển cấp quyền hoặc bất chấp thuận với đơn vị phát hành{"\n"}
                             + Sử dụng, bán, cho mượn, sao chép, chỉnh sửa, kết nối tới, phiên dịch, phát hành, công bố các thông tin liên qua đến ứng dụng{"\n"}
                             + Sử dụng ứng dụng để đăng tải, chuyển, truyền, chia sẻ hoặc lưu trưc bất kỳ nội udng vi phạm pháp luật, quyền sở hữu trí tuệ{"\n"}
                             + Các hình thức vi phạm khác{"\n\n"}
                            <Text style={{fontWeight:'bold'}}>6. Xử lý vi phạm</Text>
                            {"\n\n"}
                            Trường hợp bạn vi phạm bất kỳ quy định nào trong Thỏa thuận này, đơn vị phát hành có quyền ngay lập tức khóa tài khoản của bạn và xóa bỏ toàn bộ các thông tin, nội dung vi phạm, đống thời
                            tùy thuộc vào tính chất, mức độ vi phạm bạn sẽ chịu trách nhiệm trươc scow quan có thẩm quyền, đơn vị phát hành và các bên thứ ba có liên quan về mọi thiệt hại gây ra bởi hành vi vi phạm của bạn.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>7. Thông tin liên hệ</Text>
                            {"\n\n"}
                            - Địa chỉ email: y_hcmute@hcmute.edu.vn; hoặc {"\n"}
                            - Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh: Số 1 Võ Văn Ngân, phường Linh Chiểu, quận Thủ Đức, Thành phố Hồ Chí Minh.{"\n\n"}
                            Trân trọng cảm ơn bạn đã sử dụng sản phẩm và dịch vụ của chúng tôi.
                        </Text>

                </ScrollView>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    home:{
        height:deviceHeight-25,
        width: deviceWidth-10,
    },
    title:{
        fontSize:15,
        textAlign:'center',
        fontWeight:'bold',
        alignItems:'center'
    }
})