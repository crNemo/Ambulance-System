import { AmbulanceListData } from '@/utils/AmbulanceListData'
import React, { useState } from 'react'
import AmbulanceListItem from './AmbulanceListItem'

const AmbulanceListOptions = ({distance}) => { 
  const [activeIndex,setActiveIndex]=useState();
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
        <h2 className='text-[22px] font-bold'>Recommended</h2>
        {AmbulanceListData.map((item, index)=>(
            <div key={index} className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex==index? 'border-[3px]':null}`}
            onClick={()=>setActiveIndex(index)}
            >
                <AmbulanceListItem ambulance={item} distance={distance}/>
            </div>
        ))}
    </div>
  )
}

export default AmbulanceListOptions