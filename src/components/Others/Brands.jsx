import React from 'react'
import brand_1 from '../../assets/brand_1.png'; 
import brand_2 from '../../assets/brand_2.png'
import brand_3 from '../../assets/brand_3.png'
import brand_4 from '../../assets/brand_4.png'
import brand_5 from '../../assets/brand_5.png'

export function Brands() {
  return (
<div className="w-full max-w-[1317px] mx-auto h-32 bg-sky-100 flex items-center px-4 sm:px-6 md:px-8 lg:px-0">
  <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-8 lg:gap-10 w-full flex-wrap md:flex-nowrap">
    <img className="w-16 h-4 sm:w-20 sm:h-5 md:w-36 md:h-8 lg:w-44 lg:h-9 xl:w-48 xl:h-10 flex-shrink-0" src={brand_1}/>
    <img className="w-16 h-4 sm:w-20 sm:h-5 md:w-36 md:h-8 lg:w-44 lg:h-9 xl:w-48 xl:h-10 flex-shrink-0" src={brand_2} />
    <img className="w-16 h-4 sm:w-20 sm:h-5 md:w-36 md:h-8 lg:w-44 lg:h-9 xl:w-48 xl:h-10 flex-shrink-0" src={brand_3}/>
    <img className="w-16 h-4 sm:w-20 sm:h-5 md:w-36 md:h-8 lg:w-44 lg:h-9 xl:w-48 xl:h-10 flex-shrink-0" src={brand_4} />
    <img className="w-16 h-4 sm:w-20 sm:h-5 md:w-36 md:h-8 lg:w-44 lg:h-9 xl:w-48 xl:h-10 flex-shrink-0" src={brand_5} />
  </div>
</div>
  )
}

export default Brands;