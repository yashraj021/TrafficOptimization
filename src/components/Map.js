import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View,Image} from 'react-native';

// import CustomMarker  from './Marker';
import CarImg from '../assets/car.png';
import BusImg from '../assets/bus.png';
import BikeImg from '../assets/bike.png';
import GhostImg from '../assets/ghost.png';
import LightImg from '../assets/light.png';

getImage = type => {
  switch(type){
    case 'moto_motorcycle':return BikeImg;
    case 'veh_passenger':return CarImg;
    case 'bus_bus': return BusImg;
    default: return CarImg;
  }
}


class map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      center: this.props.center,
      markers: this.props.markers,
      backIcon: this.props.backIcon,
      paddingTop: 0,
      markerLat: '',
      markerLongi: '',
      flag: 0
    }
  }

  renderLongPress = () => {
    if(this.state.flag == 1) {
      return(
      <View>
        <Marker pinColor="black" coordinate={{latitude: this.state.markerLat, longitude: this.state.markerLongi}} onPress = {() => this.setState({flag: 0})}/>
      </View>
      )
    }
     
  }
  onLongPressHandler = result => {
    let { coordinate, position } = result.nativeEvent;
    console.log(coordinate,position)

    this.setState({
      markerLongi: coordinate.longitude,
      markerLat: coordinate.latitude,
      flag: 1
    });
    this.props.onDestSet();    

}

  renderMarker = (marker,key) => {
    const {coords, type,angle} = marker;
    let img = (key=='ghost') ? GhostImg:getImage(type);
      

    return (
      <Marker image = {img  } rotation={angle+90} key={Math.random().toString()} coordinate={{latitude: parseFloat(coords.lat), longitude: parseFloat(coords.lng)}} />
      // <Marker rotation={angle+90} key={Math.random().toString()} coordinate={{latitude: parseFloat(coords.lat), longitude: parseFloat(coords.lng)}}>
      // <Image source={img}/>
      // </Marker>

    );
  };

   render() {
      return (
      <View style = {{paddingTop: this.state.paddingTop}}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.center.lat,
            longitude: this.state.center.lng,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          provider = {PROVIDER_GOOGLE}
          showsUserLocation={ true }
          showsMyLocationButton = {true}
          showsTraffic = {true}
          onLongPress = {this.onLongPressHandler}
          rotateEnabled = {false}
          >
          {Object.keys(this.state.markers).map(key => this.renderMarker(this.state.markers[key], key))}
          {/* {Object.keys(this.state.markers).map(key =>  <Marker data={this.state.markers[key]}/>)} */}

          {
            this.state.flag? this.renderLongPress(): null
          }
          { <Marker image = {LightImg  } key={Math.random().toString()} coordinate={{latitude:12.974372, longitude: 77.611098}} /> }
          { <Marker image = {LightImg  } key={Math.random().toString()} coordinate={{latitude:12.973727, longitude: 77.613877}} /> }
          { <Marker image = {LightImg  } key={Math.random().toString()} coordinate={{latitude:12.976287, longitude: 77.614700}} /> }
          { <Marker image = {LightImg  } key={Math.random().toString()} coordinate={{latitude:12.975301, longitude: 77.614381}} /> }
        </MapView>
      </View>
    );
    }
}
  

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});

export default map;

