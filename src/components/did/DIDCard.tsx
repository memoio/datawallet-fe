'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { createDID } from '../api/api'
import { useDID } from '../context/DIDContext'

const DidCard: React.FC = () => {
    const { didInfo, hasDid, address, isConnected, refresh } = useDID()
    const { openConnectModal } = useConnectModal()

    const [openModal, setOpenModal] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [copied, setCopied] = useState(false)
    const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current) }, [])

    const shortAddr = (addr?: string) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '')

    const ellipsisMiddle = (s: string, visible = 18) => {
        if (!s) return ''
        if (s.length <= visible) return s
        const head = s.slice(0, Math.ceil(visible / 2))
        const tail = s.slice(-Math.floor(visible / 2))
        return `${head}…${tail}`
    }

    const onOpenModal = useCallback(() => {
        if (!isConnected || !address) {
            openConnectModal?.()
            return
        }
        setOpenModal(true)
    }, [isConnected, address, openConnectModal])

    const onConfirmCreate = useCallback(async () => {
        try {
            if (!isConnected || !address) {
                openConnectModal?.()
                return
            }
            setSubmitting(true)
            await createDID(address)
            await refresh()
            setOpenModal(false)
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : '创建 DID 失败')
        } finally {
            setSubmitting(false)
        }
    }, [isConnected, address, openConnectModal, refresh])

    const onCopyDid = useCallback(async () => {
        try {
            if (didInfo?.did) {
                await navigator.clipboard.writeText(didInfo.did)
                setCopied(true)
                if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
                copyTimerRef.current = setTimeout(() => setCopied(false), 1200)
            }
        } catch { }
    }, [didInfo?.did])

    return (
        <>
            {hasDid && didInfo ? (
                <div className='rounded-xl border border-[#05F292]/40 bg-[#041a13] p-4 text-white max-w-[520px]'>
                    <div className='flex items-center gap-2'>
                        <span className='opacity-70'>DID:</span>
                        <span className='font-mono break-all'>{ellipsisMiddle(didInfo.did)}</span>
                        <button
                            onClick={onCopyDid}
                            className='ml-2 h-7 w-7 grid place-items-center rounded-[6px] bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#05F292]/50'
                            aria-label={copied ? '已复制' : '复制 DID'}
                            title={copied ? '已复制' : '复制 DID'}
                        >
                            {copied ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className='flex items-center gap-2 mt-1'>
                        <span className='opacity-70'>Number:</span>
                        <span className='font-mono break-all'>{didInfo.number}</span>
                    </div>
                </div>
            ) : (
                <button
                    onClick={onOpenModal}
                    className='bg-[#05F292] lg:w-[162px] w-[130px] p-2 lg:h-[59px] rounded-[38px] items-center justify-center flex font-bold phetsarath2 disabled:opacity-60'
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Create DID'}
                </button>
            )}

            {openModal && (
                <div className='fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center'>
                    <div className='w-[90%] max-w-xl rounded-[18px] border border-[#05F292] bg-[#041a13] p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <p className='font-bold text-white text-[20px]'>确认创建 DID</p>
                            <button onClick={() => setOpenModal(false)} className='text-white/70 hover:text-white' aria-label='关闭'>✕</button>
                        </div>

                        <div className='bg-[#05F2920D] border-x-[3px] rounded-[18px] border-[#05F292] p-5'>
                            <div className='flex flex-col gap-6'>
                                <div className='w-full items-center justify-between flex flex-row'>
                                    <p className='font-bold text-white text-[18px]'>Network</p>
                                    <p className='font-bold text-white text-[18px]'>Memo Chain</p>
                                </div>
                                <div className='w-full items-center justify-between flex flex-row'>
                                    <p className='text-white text-[16px]'>Mint to</p>
                                    <p className='text-white text-[16px]'>{shortAddr(address)}</p>
                                </div>
                                <div className='w-full items-center justify-between flex flex-row'>
                                    <p className='text-white text-[16px]'>Mint With</p>
                                    <p className='text-white text-[16px]'>{shortAddr(address)}</p>
                                </div>
                                <div className='w-full items-center justify-between flex flex-row'>
                                    <p className='text-white text-[16px]'>Total</p>
                                    <p className='text-white text-[16px]'>0.0 MEMO + Gas Fee</p>
                                </div>
                                <p className='text-white/80 text-sm'>总费用包含账户部署和 NFT 铸造所需的 Gas 费。</p>

                                <div className='flex items-center gap-3 justify-end'>
                                    <button onClick={() => setOpenModal(false)} className='h-[44px] px-5 rounded-[32px] bg-white/10 text-white hover:bg-white/20' disabled={submitting}>取消</button>
                                    <button onClick={onConfirmCreate} disabled={submitting} className={`h-[44px] px-6 rounded-[32px] bg-[#05F292] font-bold ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                        {submitting ? '正在创建...' : '确认创建'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DidCard