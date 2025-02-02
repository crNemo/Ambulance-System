"use client";
import React, { useState, useCallback, useEffect, useContext, use } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const GoogleMapSection = () => {

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.43,
  };

  const [center, setCenter] = useState({
    lat: 27.693306,
    lng: 85.321111,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([null]);

  useEffect(() => {
    if (source?.length != [] && map) {

      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });

      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    if(source.length!=[] && destination.length != []){
      directionRoute();
    }

  }, [source,map]);

  const directionRoute = () => {
    const DirectionService = new google.maps.DirectionsService();

    DirectionService.route(
      {
      origin:{ lat:source.lat, lng:source.lng},
      destination:{ lat:destination.lat, lng:destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK)
        {
        setDirectionRoutePoints(result);
      }else{
        console.error(`error fetching direction ${result}`);
      }
    });
  };

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if(source.length!=[] && destination.length != []){
      directionRoute();
    }
  }, [destination,map]);


  const onLoad = useCallback(
    function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '1d92f636fc88e959' }}
    >

      {/* Source point shower */}
      {source.length != [] ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        >
          <OverlayViewF position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className='p-2 font-bold inline-block bg-white border rounded-lg'>
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}



      {/* Destination Point Marker shower */}
      {destination.length != [] ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/destination.png",
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        >
          <OverlayViewF position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className='p-2 font-bold inline-block bg-white border rounded-lg'>
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {/* Route shower */}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: 'green',
              strokeWeight: 5,
            },
          }}
        />
      )}

    </GoogleMap>
  );
};

export default GoogleMapSection;