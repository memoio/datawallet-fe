import React from 'react'
import Image from 'next/image'


const DidHero = () => {
    return (
        <div className='flex w-full lg:h-[100vh] px-[7%] flex-col pt-8 relative overflow-hidden'>
            <Image src={"/Images/Ellipse.svg"} className='absolute left-[-8%] lg:block hidden' width={507} height={371} alt='' />
            <Image src={"/Images/right-ellipse.svg"} className='absolute right-[0px] lg:block hidden' width={347} height={371} alt='' />
            <div className='flex flex-col items-center'>
                <div data-aos="fade-right" className='w-full justify-between items-center flex lg:flex-row flex-col py-[10%] z-[500] lg:pr-[5%]'>
                    <div className='flex flex-col gap-3'>
                        <p className='lg:text-[80px] text-[35px] font-normal paytone text-[#05F292]'>Data DID</p>
                        <p className='lg:text-[25px] font-normal phetsarath text-white'>Your all-in-one, privacy-preserving self-sovereign <br className='lg:block hidden' /> identity. Own, manage, and monetize your data!</p>
                    </div>
                    <Image src={"/Images/laptop.svg"} className='z-[500]' width={313.02} height={316.46} alt='' />
                </div>
            </div>
        </div>
    )
}

export default DidHero