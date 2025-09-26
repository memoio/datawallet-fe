'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import { useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { domainAvailable, domainGetBindMsg, domainBind, domainList } from '../api/api';
import type { Hex } from 'viem';
import { useDID } from '@/components/context/DIDContext';


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

    // 钱包 & 签名
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { signMessageAsync } = useSignMessage();

    const { didInfo, hasDid } = useDID();
    const did = didInfo?.did || '';

    // 输入与校验
    const [handle, setHandle] = useState('');
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [isMinting, setIsMinting] = useState(false);
    const [myDomains, setMyDomains] = useState<string[]>([]);
    const [loadingDomains, setLoadingDomains] = useState(false);



    useEffect(() => {
        if (!did) { setMyDomains([]); return; }
        (async () => {
            setLoadingDomains(true);
            try {
                const list = await domainList(did);   // 已在 API 统一为 string[]
                setMyDomains(list);
            } catch {
                setMyDomains([]);
            } finally {
                setLoadingDomains(false);
            }
        })();
    }, [did]);

    // 节流检查可用性
    useEffect(() => {
        if (!handle) { setAvailable(null); setErr(null); return; }
        const norm = handle.toLowerCase().trim();
        if (!/^[a-z0-9-]{3,30}$/.test(norm)) {
            setAvailable(null);
            setErr('仅限小写字母/数字/短横线，长度3-30');
            return;
        }
        setErr(null);
        setChecking(true);
        let cancelled = false;
        const t = setTimeout(async () => {
            try {
                const ok = await domainAvailable(`${norm}.memo`);
                if (!cancelled) setAvailable(ok);
            } catch {
                if (!cancelled) { setAvailable(null); setErr('检查失败'); }
            } finally {
                if (!cancelled) setChecking(false);
            }
        }, 400);
        return () => { cancelled = true; clearTimeout(t); };
    }, [handle]);

    const fullDomain = handle ? `${handle.toLowerCase().trim()}.memo` : '';

    const onMint = async () => {
        try {
            if (!isConnected) { openConnectModal?.(); return; }
            if (!hasDid || !did) { alert('缺少 DID，请先创建 DID'); return; }   // 调整
            if (!available) { alert('域名不可用'); return; }

            setIsMinting(true);
            const msg = await domainGetBindMsg(did, fullDomain);
            const isHex = typeof msg === 'string' && /^0x[0-9a-fA-F]*$/.test(msg);
            const sig = await signMessageAsync({ message: isHex ? ({ raw: msg as Hex }) : msg });
            await domainBind(did, fullDomain, sig);

            // 刷新列表；失败则本地追加兜底
            try {
                const list = await domainList(did);
                setMyDomains(list);
            } catch {
                setMyDomains(prev => prev.includes(fullDomain) ? prev : [fullDomain, ...prev]);
            }

            setHandle('');
            setAvailable(false);
            alert('Mint 成功');
        } catch (e: unknown) {
            if (e && typeof e === 'object' && 'message' in e) {
                alert((e as { message?: string }).message || 'Mint 失败');
            } else {
                alert('Mint 失败');
            }
        } finally {
            setIsMinting(false);
        }
    };

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
                        <input
                            type="text"
                            placeholder='Enter a handle'
                            value={handle}
                            onChange={(e) => setHandle(e.target.value.toLowerCase())}
                            className='w-[70%] p-2 outline-none border-none bg-transparent'
                        />
                        <div className='flex items-center gap-2'>
                            <p>.memo</p>
                            {checking && <span className='text-sm text-gray-300'>Checking…</span>}
                            {!checking && err && <span className='text-sm text-red-400'>{err}</span>}
                            {!checking && available === true && <span className='text-sm text-[#05F292]'>Available</span>}
                            {!checking && available === false && <span className='text-sm text-red-400'>Unavailable</span>}
                        </div>
                    </div>

                    {available && !err && (
                        <div className='border border-[#05F29280] rounded-lg p-5 text-white mt-4'>
                            <div className='flex items-center gap-2 mb-4'>
                                <span className='w-3 h-3 rounded-full bg-[#05F292]' />
                                <span className='text-[#05F292]'>Available</span>
                            </div>
                            <div className='grid grid-cols-2 gap-y-2 text-sm'>
                                <span className='text-gray-300'>Mint Price</span><span>0.0 MEMO</span>
                                <span className='text-gray-300'>Network</span><span>Memochain</span>
                                <span className='text-gray-300'>Gas Fee</span><span>Dynamic</span>
                                <span className='text-gray-300'>Mint to</span><span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect wallet'}</span>
                                <span className='text-gray-300'>Pay with</span><span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect wallet'}</span>
                                <span className='text-gray-300'>Total</span><span>0.0 MEMO + Gas Fee</span>
                            </div>
                            <button
                                onClick={onMint}
                                disabled={!isConnected || !hasDid || isMinting}
                                className={`w-full mt-4 rounded-full py-3 ${(!isConnected || !hasDid || isMinting) ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#05F292] text-black hover:opacity-90'}`}
                                title={!hasDid ? '缺少 DID' : (!isConnected ? '请先连接钱包' : '')}
                            >
                                {isMinting ? 'Minting…' : `Mint ${fullDomain || ''}`}
                            </button>
                            {(!hasDid) && (
                                <p className='mt-2 text-sm text-red-400'>当前账号尚未创建 DID，请先在首页创建 DID</p>
                            )}
                            {/* 新增：我的已绑定域名 */}
                            {myDomains.length > 0 && (
                                <div className='mt-6 text-white'>
                                    <p className='mb-2 text-sm text-gray-300'>My Domains</p>
                                    <ul className='list-disc list-inside text-sm'>
                                        {myDomains.map(d => (<li key={d}>{d}</li>))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
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
            <div className='mt-8 text-white'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold'>我的域名</h3>
                    <button
                        className='p-2 rounded-full hover:bg-white/10 disabled:opacity-50'
                        onClick={() => did && domainList(did).then(setMyDomains).catch(() => { })}
                        disabled={!did || loadingDomains}
                        aria-label="刷新列表"
                        title={loadingDomains ? '刷新中…' : '刷新'}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`w-5 h-5 ${loadingDomains ? 'animate-spin text-[#05F292]' : 'text-white'}`}
                            aria-hidden="true"
                        >
                            {/* 刷新图标（clockwise arrows） */}
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 2v6h-6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 22v-6h6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                        </svg>
                    </button>
                </div>

                {loadingDomains && myDomains.length === 0 ? (
                    <p className='text-sm text-gray-300 mt-2'>加载中…</p>
                ) : myDomains.length === 0 ? (
                    <p className='text-sm text-gray-300 mt-2'>暂无已绑定域名</p>
                ) : (
                    <ul className='list-disc list-inside text-sm mt-2'>
                        {myDomains.map(d => (
                            <li key={d}>{d}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Cards