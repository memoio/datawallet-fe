import React from 'react'
import Navigation from '../Reusable/Header'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className='flex w-full lg:h-[100vh] px-[7%] flex-col pt-8 relative overflow-hidden'>
            <Navigation />

            <Image src={"/Images/Ellipse.svg"} className='absolute left-[-8%] lg:block hidden' width={507} height={371} alt='' />
            <Image src={"/Images/right-ellipse.svg"} className='absolute right-[0px] lg:block hidden' width={347} height={371} alt='' />
            <div className='flex flex-col items-center'>
                <div data-aos="fade-right" className='w-full justify-between items-center flex lg:gap-0 gap-10 lg:flex-row flex-col py-[10%] z-[500]'>
                    <div className='flex flex-col gap-3'>
                        <p className='lg:text-[80px] text-[35px] font-normal paytone text-[#05F292]'>Data DID</p>
                        <p className='lg:text-[25px]  font-normal phetsarath text-white'>Your all-in-one, privacy-preserving self-sovereign <br className='lg:block hidden' /> identity. Own, manage, and monetize your data!</p>
                        <Link href={"/did"} className='bg-[#05F292] lg:w-[162px] w-[130px] p-2 lg:h-[59px] rounded-[38px] items-center justify-center flex font-bold phetsarath2'>Create DID</Link>
                    </div>
                    <Image src={"/Images/hero-img.svg"} className='z-[500] lg:w-[313.02px] w-[50%]' width={313.02} height={316.46} alt='' />
                </div>
                <div className='relative lg:block hidden'>
                    <Image data-aos="fade-left" src={"/Images/logo.svg"} className='absolute left-[50%] z-[5000] top-[-8px]' height={41} width={41} alt='' />
                    <p className='text-[#929292] font-bold tracking-widest'>---------------------------------------------------------------------------------------------</p>
                </div>
            </div>
        </div>
    )
}

export default Hero