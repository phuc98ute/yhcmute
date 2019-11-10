import {Dimensions, StyleSheet,} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar = deviceWidth * 0.1;
const bottomFlex = logoHeight < 0 ? 0 : logoHeight;
const fontSize = logoHeight < 0 ? 11 : 13;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        width: deviceHeight * 0.15,
                    height: deviceHeight * 0.15,
    },
    statusbar:{
        height: deviceHeight * 0.7
    },
    bodyStatus:{
        alignItems: 'center', height: '100%', marginTop: '3%',
    },
    logoStatusbar:{ height: logobar, width: logobar, flex: 1, margin: 10 },
    titleStatusbar:{ flex: 8, marginTop: 20, color: '#0000DD', fontWeight: 'bold', fontSize: fontSize },
    mainContainer:{
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
    buttonContainer:{
        borderRadius: 30,
        backgroundColor: "#3366CC",
        alignItems: "center",
        height: deviceHeight * 0.05,
        padding: 3,
        flex: 1,
        marginLeft: '1%'
      },
    buttonForget:{ height: deviceHeight * 0.05, alignItems: "center", marginTop: '2%', },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:18
    },
});

export  default styles;