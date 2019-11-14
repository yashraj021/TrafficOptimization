import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';

const UniqueKey = (props) => {
    
        return(
            <View style = {styles.uniqueKey}>
                <TextInput  placeholder = {'Enter Unique Id'} placeholderTextColor = "#d6d3cb" onChangeText = {props.onChangeTextHandler} onSubmitEditing= {props.onSubmitHandler}/>
            </View>
        )
}

const styles = StyleSheet.create({
    uniqueKey: {
    position: 'absolute',
    flex: 1,
    height: 40,
    top: '11%',
    right: 300,
    left: 10,
    paddingLeft: 5,
    bottom: 700,
    backgroundColor: 'white',
    borderRadius: 5,
    }
 });

 export default UniqueKey;