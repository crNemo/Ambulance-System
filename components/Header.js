import React from 'react'

const Header = () => {
    const headerMenu = [
        {
            id: 1,
            name: 'Ambulance',
            icon:'/ambulance.png'
        },
        {
            id:2,
            name:'Medicines',
            icon:'/box.png'
        }
    ]
    return (
        <div className='p-4 pb-3 pl-10 border-b-[4px] border-gray-200'>
            <div className='flex gap-24 items-center '>
                <img src='/logo.png' width={100} height={150} alt='logo' />
                <div className='flex gap-6 items-center'>
                    {headerMenu.map((item) => (
                        <div key={item.id} className='flex gap-2 items-center'>
                            <img src={item.icon} width={23} height={50} alt='icon' />
                            <h2 className='text-[14px] font-medium'>{item.name}</h2> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Header