"use client";
import React, { useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    type === 'source'
      ? setPlaceholder('Needed Location')
      : setPlaceholder('DropOff Location');
  }, [type]);

  const getLatAndLng = (place, type) => {
    if (!place || !place.value) {
      console.error('Invalid place object:', place);
      return;
    }

    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        if (type === 'source') {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
          console.log('Source set:', {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
          console.log('Destination set:', {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg my-3 flex items-center gap-4'>
      <img src={type === 'source' ? '/source.png' : '/destination.png'} width={20} height={20} alt={type} />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => { getLatAndLng(place, type); setValue(place); },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              color: 'blue',
              backgroundColor: '#00ffff00',
              border: 'none',
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;