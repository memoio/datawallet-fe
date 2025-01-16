'use client'
import React, { useState } from 'react'
import Navigation from '../Reusable/Header'
import Image from 'next/image'
import GeneralModal from './Modal'

const CreateIndex = () => {
    const [openmodal, setOPenModal] = useState(false)
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
    const nft = [
        {
            img: "/Images/nft2.svg",
            Title: "Basenames",
            text: "Description"
        },
        {
            img: "/Images/nft2.svg",
            Title: "Basenames",
            text: "Description"
        },
        {
            img: "/Images/nft2.svg",
            Title: "Basenames",
            text: "Description"
        },
    ]
    const handleModal = () => {
        setOPenModal(!openmodal)
    }
    const close = () => {
        setOPenModal(false)
    }
    return (
        <div className='relative'>
            <div className='flex w-full  px-[7%] flex-col pt-8 relative overflow-hidden'>
                <Navigation />
                <Image src={"/Images/Ellipse.svg"} className='absolute left-[-8%] lg:block hidden' width={507} height={371} alt='' />
                <Image src={"/Images/right-ellipse.svg"} className='absolute right-[0px] lg:block hidden' width={347} height={371} alt='' />
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col w-full items-center py-[7%]'>
                        <div className='bg-[#05F2920D] border-x-[3px] rounded-[18px] flex border-[#05F292] h-[144px] lg:w-[595px] w-full items-center justify-around'>
                            <div className='flex flex-col items-center text-white'>
                                <p className='text-[18px] text-white'>Token Balance</p>
                                <p className='phetsarath font-bold text-[20px]'>9.99  MEMO</p>
                            </div>
                            <div className='flex flex-col items-center text-white'>
                                <p className='text-[18px] text-white'>Token Balance</p>
                                <p className='phetsarath text-[20px]'>3</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-right" className='w-full justify-between items-center flex lg:flex-row flex-col lg:gap-0 gap-11 z-[500] lg:pr-[5%]'>
                        <div className='flex flex-col gap-3'>
                            <p className='lg:text-[80px] text-[35px] font-normal paytone text-[#05F292]'>Data DID</p>
                            <p className='lg:text-[25px] text-[14px] font-normal phetsarath text-white'>Your all-in-one, privacy-preserving self-sovereign <br className='lg:block hidden' /> identity. Own, manage, and monetize your data!</p>
                        </div>
                        <Image src={"/Images/createdid.svg"} className='z-[500] lg:w-[468.02px] w-[50%]' width={468.02} height={316.46} alt='' />
                    </div>
                </div>
                <div className='w-full flex items-center'>
                    <div data-aos="fade-right" className='flex lg:flex-row flex-col  lg:mt-0 mt-10 lg:gap-0 gap-4 lg:py-[10%] w-full justify-between'>
                        {
                            data.map((item, index) => (
                                <div key={index} className={`flex flex-col px-4 gap-3 justify-center lg:w-[365px] w-full h-[266px] rounded-[20px] bg-[#0663412B] ${index === 0 ? "card" : ""}`}>
                                    <div className='w-[48px] h-[48px] rounded-full bg-[#05F292] flex items-center justify-center'>
                                        <p className='text-[22px] font-bold phetsarath2'>{item.no}</p>
                                    </div>
                                    <p className='flex text-justify text-white text-[17.5px] phetsarath'>{item.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='w-full flex lg:flex-row flex-col lg:gap-0 gap-10 lg:mb-[10%] mb-[10%] lg:mt-0 mt-4 items-center justify-between'>
                    <div className='lg:w-[45%] flex flex-col gap-5'>
                        <p className='lg:text-[34px] text-[20px] font-bold bind paytone'>.Memo Name Service</p>
                        <p className='lg:text-[20px] text-white'>Make sure your domain name is readable and easy to remember.</p>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='lg:text-[20px] text-white'>My Domain</p>
                            <div className='tabs w-[115px] h-[33px] rounded-[38.2px] flex items-center justify-center'>
                                <p className='font-bold text-white phetsarath2'>cathy.memo</p>
                            </div>
                        </div>
                        <div className='w-full border-[1px] flex flex-row items-center justify-between rounded-[37px] text-white px-4 border-[#05F292]'>
                            <input type="text" placeholder='Enter a handle' className='w-[80%] p-2 outline-none border-none bg-transparent' />
                            <p>.Memo</p>
                        </div>
                    </div>
                    <Image src={"/Images/createmem0.svg"} className='lg:w-[370.61px] w-[50%]' width={370.61} height={283} alt='' />
                </div>
                <Image className='absolute lg:block hidden left-0 top-[45%] rotate-180' src={"/Images/left22.svg"} width={304} height={204} alt='' />
                <Image className='absolute lg:block hidden right-[-7%] bottom-[-8%]' src={"/Images/left22.svg"} width={304} height={204} alt='' />

                <div data-aos="fade-right" className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:py-[10%]  w-full justify-between'>
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
                <div className='flex flex-col lg:gap-[6rem] gap-4 pb-[10%] relative lg:mt-0 mt-11'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <p className='bind lg:text-[34px] font-bold paytone'>Data NFT</p>
                        <button onClick={handleModal} className='lg:w-[162.94px] lg:h-[57px] p-2 w-[80px] rounded-[42px]  bg-[#05F292] font-bold flex items-center justify-center'>Mint</button>
                    </div>
                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 items-center w-full justify-between'>
                        {
                            nft.map((item, index) => (
                                <div key={index} className='w-[375px] h-[296px] bg-[#0663412B] rounded-[18px] p-3 flex flex-col gap-2'>
                                    <Image src={item.img} width={338} height={179} alt='' />
                                    <div className='flex flex-col gap-2 text-white'>
                                        <b>{item.Title}</b>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>
            {
                openmodal && (
                    <GeneralModal handleClose={close} />
                )
            }
        </div>
    )
}

export default CreateIndex
