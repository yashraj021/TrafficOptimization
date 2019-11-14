import React from 'react';
import { Modal, Text, TouchableOpacity, Image, TextInput, View, StyleSheet, Dimensions} from 'react-native';
let { width, height } = Dimensions.get('window');


   ModalComponent = (props) => (
    <Modal
    animationType="slide"
    transparent={true}
    visible={props.boolTrue}
    onRequestClose = {()=> props.cb(false)}
  >
    <View style = {styles.modalSlide}>
      <TextInput style = {styles.destLoc}/>
    </View>
  </Modal>

  )
const styles = StyleSheet.create({
  modalSlide : {
    top: 700,
    bottom: 0,
    width: width,
    backgroundColor: 'white',
    position: 'absolute',
    borderTopRightRadius:50,
    borderTopLeftRadius: 50
  },
  destLoc: {
    height: "100%",
    width: "100%",
    color: 'red',
  }
});
export default ModalComponent; 



