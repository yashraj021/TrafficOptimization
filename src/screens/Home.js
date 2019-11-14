import React from 'react';
import {  TouchableOpacity,Text, View, StyleSheet, ToastAndroid} from 'react-native';
import SocketIOClient from 'socket.io-client';
import Map from '../components/Map';
import {  centerCoords, LONGITUDE_DELTA, LATITUDE, LONGITUDE, LATITUDE_DELTA, Runtime_permission} from '../constants';
import {url} from '../constants';
import {getLocation, watchPosition, broadcastLocation} from '../API/location';
import UniqueKey from '../components/UniqueKey';
import ModalComponent from '../components/ModalComponent';

import Car from '../assets/car.png';

import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
  state = {
    clientId: '',
    
    center: {
      lat: centerCoords.lat,
      lng: centerCoords.lng,
    },
    clients: {},
    trafficSignals:{},
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    destCoords: {
      latitude: '',
      longitude: ''
    },
    priorityTimer:0,
    destiFlag: false,
    liveSignal:'green',
  }

  onDestSet = () => {
    this.setState({
      destiFlag: true
    })
  }
  onDestSet1 = () => {
    this.setState({
      destiFlag: false
    })
  }

onChangeTextHandler = (event) => (
    this.setState({clientId: event})
)

onSubmitHandler = () => {
  this.setName(this.state.clientId);
  
}

getClientID = () => {
  try{
    AsyncStorage.getItem('clientID', (err, result) => {
      this.setState({clientId:result});
    });
  }catch(error){
    console.log("cannot get item", error);
  }
}

  onDataReceive = data => {
    let {clients} = this.state;
    let {id, coords, type} = data;
    if (id) {
      clients[id] = {
        coords,
        type,
      };
    }
    this.setState({clients});
  };

  
  onMultiDataReceive = (data) => {
    const {vehicles} = data;
    if(!vehicles){
      console.log("No vehicles");
      return;
    }
    // const clients = {};
    const {clients} = this.state;
    vehicles.map(vehicle => {
        if(vehicle.id){
          clients[vehicle.id] = {
            coords:{
              lat:vehicle.lat,
              lng:vehicle.lng
            },
            type:vehicle.type,
            angle:parseFloat(vehicle.angle),

          }
        }
    });
    
    this.setState({clients});
  }

  ongetSignalData=(data)=>{
    
    const {signals} = data;
    if(signals.length==4 && this.state.priorityTimer<0){
      const val = signals[3].state[1].toLowerCase();
      let color = val == 'g'? '#2dc937' : val == 'y' ? '#e7b416' : '#cc3232'; 
      this.setState({liveSignal:color});
    }
    if(!signals){
      console.log("No Signals");
      return;
    }
    // const {trafficSignals} = this.state; 
    let trafficSignals = {};
    signals.map(signal => {
        if(signal.id){
          trafficSignals[signal.id] = {
            coords:{
              lat:signal.lat,
              lng:signal.lng
            },
            state:signal.state
          }
        }
    });
    
    this.setState({trafficSignals});

  }

  setName = async (value) => {
   await AsyncStorage.setItem('clientID', value);
    
  }

  listenToLocationData = socket => {
    socket.on('LOCATION', data => {
      this.onDataReceive(data);
    });
  };

  listenToMultiLocationData = socket => {
    socket.on('LOCATIONS', data => {
      this.onMultiDataReceive(data);
  });
  }

  listenToSignalData = socket =>{
    socket.on('SIGNALS',data=>{
      this.ongetSignalData(data);
  })
  }

  setCurrentLocation = (location)=>{
    console.log("Setting current location", location);
    const {latitude,longitude} = location.coords;
    let region = {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    this.setState({region});
     
      broadcastLocation(location, this.socket, this.state.clientId);
    
  }
  
  


  async componentDidMount() {

    setInterval(()=>{
      // console.log(this.state.priorityTimer)
      this.setState({priorityTimer:this.state.priorityTimer-1})
    }, 1000);
    this.getClientID();
    await Runtime_permission();
    
    this.socket = SocketIOClient(url,{
      transports: ['websocket']
    });
    this.socket.on('connect', () => {

      console.log('connected');
         this.listenToMultiLocationData(this.socket);
    this.listenToSignalData(this.socket);

    this.socket.on('SPEED',data=>{
      console.log("Received toast", data);
      // ToastAndroid.show(data, ToastAndroid.SHORT);
      ToastAndroid.showWithGravity(
       data,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );

  })
    });

    getLocation(this.setCurrentLocation);
    watchPosition(this.setCurrentLocation);
    
  }

  
  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.map}>
          <Map 
          center={this.state.center} 
          markers={this.state.clients} 
          region = {this.state.region}
          backIcon = {Car} 
          onDestSet = {this.onDestSet}
          
          />
        </View>
        <UniqueKey onChangeTextHandler = {this.onChangeTextHandler} onSubmitHandler = {this.onSubmitHandler}/>

          <View style = {{
            flex: 1,
            backgroundColor: this.state.liveSignal,
            position: 'absolute',
            top: '9%',
            height: 60,
            width: 60,
            left: '85%',
            borderRadius: 30
            }}>
          </View>
          <TouchableOpacity style = {{
            flex: 1,
            backgroundColor: '#980000',
            position: 'absolute',
            top: '90%',
            height: 60,
            width: 150,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 5
            }} onPress={()=>this.setState({liveSignal:'#71a95a', priorityTimer:5})}>
            <Text style={{color:'white', fontSize:16}}>{'REQUEST PRIORITY'}</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  traffic: {
    
  }
});

export default Home;
