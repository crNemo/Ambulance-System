"use client";
import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const InputItem = ({ type }) => {

    const [value, setValue] = useState(null);

    return (
        <div className='bg-slate-200 p-3 rounded-lg my-3 flex items-center gap-4'>
            <img src={type === 'source' ? '/source.png' : '/destination.png'} width={20} height={20} alt={type} />
            {/* <input
        className='bg-transparent w-full outline-none'
        type='text'
        placeholder={type === 'source' ? 'Needed Location' : 'DropOff Location'}
      /> */}
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            />
        </div>
    );
};

export default InputItem;