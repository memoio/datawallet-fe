'use client';

import React from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navigation = () => {
    return (
        <div className='flex flex-row items-center justify-between'>
            <Link href='/' className='lg:text-[28px] font-bold text-white hover:text-[#05F292] transition-colors cursor-pointer'>
                MemoLabs
            </Link>

            <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted, authenticationStatus }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                    return (
                        <div className="flex items-center gap-2 rounded-md bg-white/10 ring-1 ring-white/20 p-1 backdrop-blur text-white">
                            {!connected ? (
                                <button onClick={openConnectModal} type="button" className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm">
                                    连接钱包
                                </button>
                            ) : (
                                <>
                                    <button onClick={openChainModal} type="button" className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                                        {chain?.name}
                                    </button>
                                    <button onClick={openAccountModal} type="button" className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm">
                                        {account?.displayName}
                                    </button>
                                </>
                            )}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    )
}

export default Navigation