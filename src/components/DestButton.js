// import React from 'react';
// import { Modal, Text, TouchableOpacity, Image, TextInput, View, StyleSheet, Dimensions} from 'react-native';
// import Geocoder from 'react-native-geocoding';
// import Geocodes from './ModalComponent';
// let { width, height } = Dimensions.get('window');




// class DestButton extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//         }
//     }

    

//     render() {
//         return(
//             <View style = {styles.modal}>
//                 <TouchableOpacity onPress = {() => this.setState({visible: true})}>
//                     <Image
//                         style={{width: 30, height: 30}}
//                         source={{uri: 'file:///data/user/0/com.rk_app/cache/1flbl0j_25@2.375x.png'}}
//                     />
//                 </TouchableOpacity>
//                 <Modal
//                 style = {{marginTop: 100}}
//                 animationType="slide"
//                 transparent={true}
//                 visible={this.state.visible}
//                 onRequestClose={() => {
//                     this.setState({visible: false})
//                 }}>
//                     <Geocodes/>
//                 </Modal>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     modal: {
//       position: 'absolute',
//       flex: 1,
//       justifyContent: 'center',
//       padding: 8,
//       height: height - (height*0.96),
//       top: '20%',
//       right: width - (width*0.1),
//       left: 10,
//       borderRadius: 50,
//       backgroundColor: 'red',
//     }
//   });

//   export default DestButton;