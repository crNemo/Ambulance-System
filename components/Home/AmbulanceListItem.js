import Image from 'next/image'
import React from 'react'

const AmbulanceListItem = ({ ambulance, distance }) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getImageSrc = (url) => {
    if (isValidUrl(url)) {
      return url;
    }
    // Ensure relative paths start with a leading slash
    return url.startsWith('/') ? url : `/${url}`;
  };


  return (
    <div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-5'>
          <Image src={getImageSrc(ambulance.image)} width={100} height={100} alt="Ambulance" />
          <div>
            <h2 className='font-semibold text-[18px]'>{ambulance.name}</h2>
            <p>{ambulance.desc}</p>
          </div>
        </div>
        <h2 className='text-[18px] font-semibold'>NRs {(ambulance.amount *distance).toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default AmbulanceListItem