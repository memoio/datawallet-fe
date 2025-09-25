'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDID } from './context/DIDContext'
import { useRouter } from 'next/navigation'

const Nft = () => {
    const { didInfo, hasDid, isConnected } = useDID()
    const did = didInfo?.did || ''
    const { openConnectModal } = useConnectModal()
    const router = useRouter()

    const ellipsisMiddle = (s: string, visible = 18) => {
        if (!s) return ''
        if (s.length <= visible) return s
        const head = s.slice(0, Math.ceil(visible / 2))
        const tail = s.slice(-Math.floor(visible / 2))
        return `${head}…${tail}`
    }

    // 跳转文件页
    const onGoFiles = useCallback(() => {
        if (!isConnected) {
            openConnectModal?.()
            return
        }
        if (!hasDid) {
            alert('未创建 DID，请先创建 DID')
            return
        }
        router.push('/files')
    }, [hasDid, isConnected, openConnectModal, router])

    const hint = !isConnected
        ? '请先连接钱包以继续'
        : !hasDid
            ? '未创建 DID，前往文件页前请先创建 DID'
            : 'Go to Files'

    return (
        <div className='px-[7%] flex flex-col justify-center min-h-screen relative gap-7 py-12'>
            <Image className='absolute lg:block hidden right-0 top-[-70%]' src={"/Images/rightring.svg"} width={404} height={204} alt='' />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                {/* 左侧：标题+说明 */}
                <div className='flex flex-col gap-5'>
                    <p className='bind lg:text-[34px] text-[20px] font-bold paytone'>Data NFT</p>

                    <p className='text-sm lg:text-base text-white/80 leading-relaxed'>
                        Your all-in-one, privacy-preserving self-sovereign identity. Own, manage, and monetize your data!
                    </p>

                    {!isConnected && (
                        <button
                            type='button'
                            onClick={() => openConnectModal?.()}
                            className='mt-2 inline-flex h-10 px-4 rounded-[8px] bg-[#05F292] font-semibold text-black'
                        >
                            连接钱包
                        </button>
                    )}

                    {isConnected && !hasDid && (
                        <div className='mt-2 text-sm text-white/80'>
                            请先创建 DID。
                            <Link href='/' className='ml-2 text-[#05F292] underline'>返回首页创建</Link>
                        </div>
                    )}
                </div>

                {/* 右侧：跳转文件页的入口卡片 */}
                <div className='w-full flex lg:justify-end'>
                    <button
                        type='button'
                        onClick={onGoFiles}
                        className={`w-full max-w-[420px] h-[220px] rounded-[12px] border-2 border-dashed 
                            ${isConnected && hasDid ? 'border-white/25 bg-white/5 hover:border-[#05F292] hover:bg-[#05F29214]' : 'border-white/15 bg-white/5 cursor-not-allowed'}
                            transition-colors flex flex-col items-center justify-center text-center px-6`}
                    >
                        <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white/80 mb-3'>
                            {/* 前往文件页图标 */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="w-6 h-6">
                                <path d="M3 7a2 2 0 0 1 2-2h6l3 3h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                                <path d="M9 13h6" />
                                <path d="M9 17h6" />
                            </svg>
                        </span>
                        <p className='text-xs text-white/70'>{hint}</p>
                        {hasDid && did && (
                            <p className='text-[11px] text-white/50 mt-1'>DID: {ellipsisMiddle(did)}</p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Nft