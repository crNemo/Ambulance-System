"use client";
import { useState } from 'react';
import { toast } from "react-hot-toast";
import AmbulanceListItem from './AmbulanceListItem';
import { AmbulanceListData } from '../../utils/AmbulanceListData';
import { Toaster } from 'react-hot-toast';


const AmbulanceListOptions = ({ distance }) => {

  const handleToast = () => {

    toast.promise(
      new Promise((resolve, reject) => {
        if (selectedAmbulance) {
          resolve();
        } else {
          reject();
        }
      }),
      {
        loading: 'Booking in progress...',
        success: <b>Ambulance on the Way!!</b>,
        error: <b>Try another Ambulance Sorry -_- </b>,
      }
    );
  }

  const [activeIndex, setActiveIndex] = useState();
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");


  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {AmbulanceListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex === index ? 'border-[3px]' : ''}`}
          onClick={() => { setActiveIndex(index); setSelectedAmbulance(item); }}
        >
          <AmbulanceListItem ambulance={item} distance={distance} />
        </div>
      ))}

      {selectedAmbulance?.name ? (
        <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center'>
          <h2>Make Payment For</h2>
          <button
            className='mt-2 p-3 bg-[#5f6fff] text-white rounded-lg'
            onClick={handleToast}>
            Resuest Payment
          </button>

        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default AmbulanceListOptions;
