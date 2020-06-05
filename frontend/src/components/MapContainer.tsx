import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '60vw',
  height: '60vh',
  display: 'inline-block',
  'border-radius': '15px',
  'box-shadow': '5px 10px #888888'

};

const center = {
  lat: 49.282730,
  lng: -123.120735
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

function MapContainer() {

  interface IMarker {
    id: number;
    name: string;
    lat: number;
    lng: number;
  }

  const {isLoaded, loadError} = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  const [markers, setMarkers] = React.useState([{id: 1, name: 'Jessie\'s Place', lat: 49.239370, lng: -123.044590 }]);
  const [selected, setSelected] = React.useState<IMarker | null>(null);
  
  //for controlling pan of map
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {mapRef.current = map;}, []);

  if (loadError) return <div> "Error loading maps" </div>;
  if (!isLoaded) return <div>"Loading"</div>;
   
  return (

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
        onLoad = {onMapLoad}
      >
        { markers.map(marker => (
          <Marker 
            key={marker.id} 
            position= {{lat: marker.lat, lng: marker.lng}} 
            icon= {{
              url:'/shop_cart.svg',
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15)
            }}
            onClick={() => setSelected(marker)}
          />
        )) }
         {selected ? (
          <InfoWindow 
            position={{lat: selected.lat, lng: selected.lng}} 
            onCloseClick={() => setSelected(null)}
          >
              <div>
                <h4>{selected.name}</h4>
                <table>
                  <tr>
                    <td><img className="icon" src="/tp.svg" /> </td>
                    <td>In Stock</td>
                  </tr>
                  <tr>
                    <td><img className="icon" src="/hand-sanitizer.svg" /></td>
                    <td>Out of Stock</td>
                  </tr>
                  <tr>
                    <td><img className="icon" src="/mask.svg" /></td>
                    <td>Unknown</td>    
                  </tr>  
                </table>
              </div>
           </InfoWindow>) : null}
        
      </GoogleMap>
  )
}

export default React.memo(MapContainer)
