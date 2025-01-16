import Image from 'next/image'
import React from 'react'

const Nft = () => {
    return (
        <div className='px-[7%] flex flex-col lg:gap-[6rem] pb-[10%] relative mt-2 gap-7'>
            <Image className='absolute lg:block hidden right-0 top-[-70%]' src={"/Images/rightring.svg"} width={404} height={204} alt='' />
            <div className='flex flex-row items-center justify-between w-full'>
                <p className='bind lg:text-[34px] text-[20px] font-bold paytone'>Data NFT</p>
                <button className='lg:w-[162.94px] w-[140px] p-2 lg:h-[57px] rounded-[42px]  bg-[#05F292] font-bold flex items-center justify-center'>Mint</button>
            </div>
            <div>
                <div className='bg-[#05F2920D] border-x-[3px] rounded-[18px] flex border-[#05F292] h-[245px] w-full items-center justify-center'>
                    <Image src={"/Images/nft.svg"} width={161} height={111} alt='' />
                </div>
            </div>

        </div>
    )
}

export default Nft