import React, {Component} from 'react';
import { ImageBackground, KeyboardAvoidingView, Modal, Text, TouchableOpacity, Image, TextInput, View, StyleSheet, Dimensions} from 'react-native';
let { width, height } = Dimensions.get('window');

const authSpaceHeight = height*0.4;
const authSpaceWidth = width*0.9;
const background = require('../assets/background.jpg');


class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNo: ''
        }
    }

    onChangeTextHandler = (event) => {
        this.setState({
            phoneNo: event
        });
    }

    render() {
        return(
            <KeyboardAvoidingView style = {styles.authScreen}>
                <View style = {styles.authSpace}>
                   
                        <View style = {styles.login}>
                            <Text style = {{fontSize: 60, color: 'black', fontFamily: "Raleway", letterSpacing: 50 }}>{'LOGIN'}</Text>
                        </View>
                        
                        <View style = {styles.phoneId}>
                            <TextInput keyboardType = 'number-pad' style = {styles.PhoneInput} placeholder = "Enter Phone Number" onChangeText = {this.onChangeTextHandler}/>
                        </View>
                    
                </View>
                <TouchableOpacity style = {styles.button}>
                    <Text style = {{color: 'white', fontSize: 25}}>{'GET OTP'}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    authScreen: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'rgba(242, 241, 241, 0.28)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authSpace: {
        width: authSpaceWidth,
        height: authSpaceHeight,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    phoneId: {
        marginTop: 20,
        width: authSpaceWidth * 0.7,
        height: authSpaceHeight * 0.2,
        backgroundColor: 'white',
        
        borderRadius: 5,
    },
    PhoneInput:  {
        fontSize: 25,
        textAlign:'center'
    },
    login: {
        marginBottom: '5%',
    },
    button: {
        width: authSpaceWidth * 0.7,
        height: authSpaceHeight * 0.2,
        backgroundColor: 'black',
        marginBottom: authSpaceHeight*0.4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthScreen;


