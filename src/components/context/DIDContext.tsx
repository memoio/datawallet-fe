'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getDIDInfo } from '../api/api'

export type DidInfo = { did: string; number: string }

type DIDContextValue = {
    didInfo: DidInfo | null
    loading: boolean
    error: string | null
    refresh: () => Promise<void>
    hasDid: boolean
    address?: string
    isConnected: boolean
}

const DIDContext = createContext<DIDContextValue | undefined>(undefined)

export const DIDProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { address, isConnected } = useAccount()
    const [didInfo, setDidInfo] = useState<DidInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        if (!isConnected || !address) {
            setDidInfo(null)
            setError(null)
            return
        }
        setLoading(true)
        setError(null)
        try {
            const res = await getDIDInfo(address)
            setDidInfo(res && res.did ? res : null)
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : '获取 DID 失败')
            setDidInfo(null)
        } finally {
            setLoading(false)
        }
    }, [isConnected, address])

    useEffect(() => {
        let alive = true
        const run = async () => {
            if (!isConnected || !address) {
                setDidInfo(null)
                setError(null)
                return
            }
            setLoading(true)
            setError(null)
            try {
                const res = await getDIDInfo(address)
                if (!alive) return
                setDidInfo(res && res.did ? res : null)
            } catch (e: unknown) {
                if (!alive) return
                setError(e instanceof Error ? e.message : '获取 DID 失败')
                setDidInfo(null)
            } finally {
                if (alive) setLoading(false)
            }
        }
        run()
        return () => { alive = false }
    }, [isConnected, address])

    return (
        <DIDContext.Provider
            value={{
                didInfo,
                loading,
                error,
                refresh,
                hasDid: !!didInfo?.did,
                address,
                isConnected,
            }}
        >
            {children}
        </DIDContext.Provider>
    )
}

export function useDID() {
    const ctx = useContext(DIDContext)
    if (!ctx) throw new Error('useDID  must be used within a DIDProvider')
    return ctx
}