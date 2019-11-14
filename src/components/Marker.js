import React from 'react';
import  {Marker} from 'react-native-maps';

import CarImg from '../assets/car.png';
import BusImg from '../assets/bus.png';
import BikeImg from '../assets/bike.png';

getImage = type => {
  switch(type){
    case 'moto_motorcycle':return BikeImg;
    case 'veh_passenger':return CarImg;
    case 'bus_bus': return BusImg;
    default: return CarImg;
  }
}

const marker = props => {
    console.log("lol",props)
    const {coords, type,angle} = props.marker;

    return (
      <Marker image = {getImage(type)} rotation={angle+90} key={Math.random().toString()} coordinate={{latitude: parseFloat(coords.lat), longitude: parseFloat(coords.lng)}} />

    );
  };
  
export default React.memo(marker);

