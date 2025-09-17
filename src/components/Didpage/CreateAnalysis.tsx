'use client'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { createDID } from '../api/api'

const CreateAnalysis = () => {
    const [handle, setHandle] = useState("Cathy")
    const { address, isConnected } = useAccount()
    const { openConnectModal } = useConnectModal()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)

    const onCreateDid = useCallback(async () => {
        try {
            if (!isConnected || !address) {
                if (openConnectModal) {
                    openConnectModal()
                } else {
                    alert('请先连接钱包')
                }
                return
            }
            setSubmitting(true)
            await createDID(address)
            router.push('/didcreate')
        } catch (err: any) {
            alert(err?.message || '创建 DID 失败')
        } finally {
            setSubmitting(false)
        }
    }, [isConnected, address, openConnectModal, router])


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
    const year = [
        "1 year", "2 years", "3 years", "Custom",
    ]
    return (
        <div className='w-full flex flex-col lg:gap-0 gap-10 overflow-y-hidden'>
            <div className='w-full px-[7%] flex lg:flex-row justify-between items-center flex-col lg:gap-0 gap-10 overflow-y-hidden'>
                <div className='lg:w-[682px] w-full h-[487px] px-[5%] bg-[#05F2920D] border-x-[3px] rounded-[18px] flex border-[#05F292]  items-center justify-center'>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='font-bold text-white text-[20px] '>Network</p>
                            <p className='font-bold text-white text-[20px] '>Memo Chain</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Mint to</p>
                            <p className='text-white text-[20px] '>0x06B45...EBFEe</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Mint With</p>
                            <p className='text-white text-[20px] '>0x06B45...EBFEe</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Total</p>
                            <p className='text-white text-[20px] '>0.0 MEMO+Gas Fee</p>
                        </div>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <button
                                onClick={onCreateDid}
                                disabled={submitting}
                                className={`w-full h-[57px] rounded-[42px] bg-[#05F292] flex items-center justify-center font-bold text-[16px] ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Creating...' : 'Create DID'}
                            </button>
                            <p className='text-white'>The total cost includes account deployment and gas fees for NFT minting.</p>
                        </div>
                    </div>
                </div>
                <Image src={"/Images/analysis.svg"} className='lg:w-[425.06px] w-[50%]' width={425.06} height={491.25} alt='' />
            </div>
            <div data-aos="fade-right" className='flex px-[7%] lg:flex-row flex-col lg:gap-0 gap-4 lg:py-[10%] w-full justify-between'>
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
            <div className='w-full flex px-[7%] lg:flex-row flex-col lg:mb-[10%] mb-[5%] items-center justify-between'>
                <div className='lg:w-[45%] flex flex-col gap-5'>
                    <p className='text-[34px] font-bold bind paytone'>Bind.Me Name Service</p>
                    <p className='text-[20px] text-white'>Make sure your domain name is readable and easy to remember.</p>
                    <div className='w-full border-[1px] h-[59px] flex flex-row items-center justify-between rounded-[37px] text-white px-4 border-[#05F292]'>
                        <input value={handle} onChange={(e) => setHandle(e.target.value)} type="text" placeholder='Enter a handle' className='w-[80%] p-2 outline-none border-none bg-transparent' />
                        <p>.Memo</p>
                    </div>
                    <div className='h-[55px] px-[5%] flex items-center w-full bg-[#021B11] rounded-[12px]'>
                        <div className='flex flex-row items-center gap-2'>
                            <Image src={"/Images/check.svg"} width={18} height={18} alt='' />
                            <p className='text-[16px] text-white font-bold phetsarath2'>Available</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex px-[7%] lg:flex-row items-center lg:gap-0 gap-5 justify-between flex-col overflow-y-hidden relative'>
                <div className='lg:w-[682px] w-full h-[603px] px-[5%] bg-[#05F2920D] border-x-[3px] rounded-[18px] flex border-[#05F292]  items-center justify-center'>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className='flex lg:flex-row flex-col lg:gap-0 gap-3 items-center justify-between w-full'>
                            <p className='text-white font-bold text-[20px]'>Domain Name Expiration</p>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                {
                                    year.map((item, index) => (
                                        <div key={index} className='tabs rounded-[38.2px] w-[66px] h-[33px] flex items-center justify-center'>
                                            <p>{item}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='font-bold text-white text-[20px] '>Network</p>
                            <p className='font-bold text-white text-[20px] '>Memo Chain</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Network</p>
                            <p className='text-white text-[20px] '>0x06B45...EBFEe</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Gas Fee</p>
                            <p className='text-white text-[20px] '>1.0 MEMO</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Mint to</p>
                            <p className='text-white text-[20px] '>0x06B45...EBFEe</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Mint With</p>
                            <p className='text-white text-[20px] '>0x06B45...EBFEe</p>
                        </div>
                        <div className='w-full items-center justify-between flex flex-row'>
                            <p className='text-white text-[20px] '>Total</p>
                            <p className='text-white text-[20px] '>0.0 MEMO+Gas Fee</p>
                        </div>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <button
                                onClick={onCreateDid}
                                disabled={submitting}
                                className={`w-full h-[57px] rounded-[42px] bg-[#05F292] flex items-center justify-center font-bold text-[16px] ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Creating...' : 'Create DID'}
                            </button>
                        </div>
                    </div>
                </div>
                <Image src={"/Images/domain.svg"} className='lg:w-[420px] w-[50%]' width={420} height={287} alt='' />
                <Image className='absolute lg:block hidden right-[-10%] top-[10%]' src={"/Images/left22.svg"} width={324} height={204} alt='' />

            </div>
            <div data-aos="fade-right" className='flex px-[7%] lg:flex-row flex-col lg:gap-0 gap-4 lg:py-[10%]  w-full justify-between'>
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
            <div className=' flex flex-col px-[7%] lg:gap-[6rem] pb-[10%] relative mt-2 gap-7'>
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

        </div>
    )
}

export default CreateAnalysis