"use client";
import React, { useContext, useEffect } from 'react';
import InputItem from './InputItem';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import { useJsApiLoader } from '@react-google-maps/api';

const SearchSection = () => {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['geometry'],
  });

  useEffect(() => {
    if (source) {
      console.log('Source:', source);
    }
    if (destination) {
      console.log('Destination:', destination);
    }
  }, [source, destination]);

  const calculateDistance = () => {
    console.log('Button clicked');
    console.log('isLoaded:', isLoaded);
    console.log('Source:', source);
    console.log('Destination:', destination);

    if (source && destination && isLoaded) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );

      console.log('Distance:', (dist*0.000621374)*1.60934);
    } else {
      console.log('Source or destination is not defined or Google Maps API is not loaded.');
    }
  };

  return (
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get Ambulance</p>
      <InputItem type='source' />
      <InputItem type='destination' />
      <button className='p-3 bg-black w-full mt-5 text-white rounded-lg' onClick={calculateDistance}>
        Search
      </button>
    </div>
  );
};

export default SearchSection;