import Image from 'next/image'
import React from 'react'

const Cards = () => {
    const data = [
        {
            no: "01",
            text: "Just like your social account and the accounts associated with it, this is a DID NFT that will be minted to the account abstraction wallet."
        },
        {
            no: "02",
            text: "This DID + account system allows you to aggregate, delete and accumulate on-chain wallets and off-chain accounts and identities in one place."
        },
        {
            no: "03",
            text: "Manage, port and monetize the value of personal data usage in a privacy-preserving way. This is your ticket to the data-to-income (D2E) era."
        },
    ]
    return (
        <div className='w-full px-[7%] flex flex-col lg:gap-0 gap-10'>
            <div data-aos="fade-right" className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:py-[10%] w-full justify-between'>
                {
                    data.map((item, index) => (
                        <div key={index} className={`flex flex-col px-4 gap-3 justify-center lg:w-[365px] h-[266px] rounded-[20px] bg-[#0663412B] ${index === 0 ? "card" : ""}`}>
                            <div className='w-[48px] h-[48px] rounded-full bg-[#05F292] flex items-center justify-center'>
                                <p className='text-[22px] font-bold phetsarath2'>{item.no}</p>
                            </div>
                            <p className='flex text-justify text-white text-[17.5px] phetsarath'>{item.text}</p>
                        </div>
                    ))
                }
            </div>
            <div className='w-full flex lg:flex-row flex-col lg:gap-0 gap-8 lg:mb-[10%] mb-[5%] items-center justify-between'>
                <div className='lg:w-[45%] flex flex-col gap-5'>
                    <p className='text-[34px] font-bold bind paytone'>Bind.Me Name Service</p>
                    <p className='text-[20px] text-white'>Make sure your domain name is readable and easy to remember.</p>
                    <div className='w-full border-[1px] flex flex-row items-center justify-between rounded-[37px] text-white px-4 border-[#05F292]'>
                        <input type="text" placeholder='Enter a handle' className='w-[80%] p-2 outline-none border-none bg-transparent' />
                        <p>.Memo</p>
                    </div>
                </div>
                <Image src={"/Images/bind.svg"} width={282.77} height={256.96} alt='' />
            </div>
            <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:mb-[10%] mb-[5%] w-full justify-between'>
                {
                    data.map((item, index) => (
                        <div key={index} className={`flex flex-col px-4 gap-3 justify-center lg:w-[365px] h-[266px] rounded-[20px] bg-[#0663412B] ${index === 0 ? "card" : ""}`}>
                            <div className='w-[48px] h-[48px] rounded-full bg-[#05F292] flex items-center justify-center'>
                                <p className='text-[22px] font-bold phetsarath2'>{item.no}</p>
                            </div>
                            <p className='flex text-justify text-white text-[17.5px] phetsarath'>{item.text}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Cards