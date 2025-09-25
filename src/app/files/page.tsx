'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDID } from '@/components/context/DIDContext'
import { listFiles, downloadFile, uploadFile } from '@/components/api/api'

type FileItem = { cid: string; name: string; size: number; uploadtime: string; mdid: string; network?: string }


const formatSize = (bytes?: number | null) => {
    if (bytes === null || bytes === undefined || isNaN(Number(bytes))) return '-'
    const b = Number(bytes)
    if (b < 1024) return `${b}B`
    if (b < 1024 ** 2) return `${Math.round(b / 1024)}KB`
    if (b < 1024 ** 3) return `${(b / 1024 / 1024).toFixed(2)}MB`
    return `${(b / 1024 / 1024 / 1024).toFixed(2)}GB`
}
// 兼容非 ISO 的时间字符串，无法解析则原样返回
const fmtTime = (s?: string) => {
    if (!s) return '-'
    const d = new Date(s)
    return isNaN(d.getTime()) ? s : d.toLocaleString()
}
// 实现：字符串中间省略
const ellipsisMiddle = (v: string, visible = 18) => {
    if (!v) return ''
    if (v.length <= visible) return v
    const head = v.slice(0, Math.ceil(visible / 2))
    const tail = v.slice(-Math.floor(visible / 2))
    return `${head}…${tail}`
}

export default function FileListPage() {
    const { didInfo, hasDid, isConnected, address } = useDID()
    const { openConnectModal } = useConnectModal()
    const did = didInfo?.did || ''

    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<FileItem[]>([])
    const [keyword, setKeyword] = useState('')

    // 上传弹窗
    const [openModal, setOpenModal] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState('')
    const [network, setNetwork] = useState<'MEFS'>('MEFS')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const canWork = isConnected && !!address && hasDid && !!did

    const fetchList = useCallback(async () => {
        if (!canWork) {
            setFiles([])
            return
        }
        setLoading(true)
        try {
            const res = await listFiles(did)
            setFiles(
                (res as FileItem[]).map(item => ({
                    cid: item.cid,
                    name: item.name,
                    size: item.size,
                    uploadtime: item.uploadtime,
                    mdid: item.mdid ?? '',
                    network: item.network ?? 'MEFS',
                }))
            )
            console.log('list files:', res)
        } catch (e) {
            console.error(e)
            setFiles([])
        } finally {
            setLoading(false)
        }
    }, [canWork, did])

    useEffect(() => {
        void fetchList()
    }, [fetchList])

    const filtered = useMemo(() => {
        const k = keyword.trim().toLowerCase()
        if (!k) return files
        return files.filter(f => f.name.toLowerCase().includes(k))
    }, [files, keyword])

    const onDownload = useCallback(async (item: FileItem) => {
        try {
            await downloadFile(did, item.cid, { filename: item.name, autoSave: true })
        } catch (e) {
            alert(e instanceof Error ? e.message : '下载失败')
        }
    }, [did])

    // 打开上传弹窗
    const onOpenModal = useCallback(() => {
        if (!isConnected || !address) {
            openConnectModal?.()
            return
        }
        if (!hasDid) {
            alert('未创建 DID，上传需要先创建 DID')
            return
        }
        setFile(null)
        setFileName('')
        setNetwork('MEFS')
        setOpenModal(true)
    }, [address, hasDid, isConnected, openConnectModal])

    const onBrowse = useCallback(() => inputRef.current?.click(), [])
    const onFiles = useCallback((fl: FileList | null) => {
        if (!fl || fl.length === 0) return
        const f = fl[0]
        setFile(f)
        setFileName(f.name)
    }, [])
    const onInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        onFiles(e.target.files)
        e.target.value = ''
    }, [onFiles])
    const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((e) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(true)
    }, [])
    const onDragLeave = useCallback<React.DragEventHandler<HTMLDivElement>>((e) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false)
    }, [])
    const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>((e) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false)
        onFiles(e.dataTransfer.files)
    }, [onFiles])

    const onSubmit = useCallback(async () => {
        if (!isConnected || !address) {
            openConnectModal?.(); return
        }
        if (!hasDid || !did) {
            alert('未创建 DID，上传需要先创建 DID'); return
        }
        if (!file) return
        setUploading(true)
        try {
            await uploadFile(address, did, (fileName || file.name).trim(), file)
            setOpenModal(false)
            await fetchList()
        } catch (e) {
            alert(e instanceof Error ? e.message : '上传失败')
        } finally {
            setUploading(false)
        }
    }, [address, did, file, fileName, fetchList, hasDid, isConnected, openConnectModal])

    return (<div className='relative min-h-screen bg-[#041a13] overflow-hidden'>
        {/* 背景装饰 */}
        <Image src={"/Images/Ellipse.svg"} className='absolute left-[-8%] top-[10%] lg:block hidden pointer-events-none select-none' width={507} height={371} alt='' />
        <Image src={"/Images/right-ellipse.svg"} className='absolute right-0 top-0 lg:block hidden pointer-events-none select-none' width={347} height={371} alt='' />

        {/* 页面内容 */}
        <div className='relative z-10 px-[7%] py-10 flex flex-col gap-6'>
            <div className='px-[7%] py-10 flex flex-col gap-6'>
                {/* 顶部：搜索 + 上传 */}
                <div className='flex items-center gap-4 flex-wrap'>
                    <div className='flex-1 min-w-[260px]'>
                        <div className='w-full h-11 rounded-full bg-white/5 border border-white/15 px-4 flex items-center gap-2'>
                            <svg width="18" height="18" viewBox="0 0 24 24" className='text-white/60'><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49L21.49 20L15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z" /></svg>
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder='搜索文件名'
                                className='bg-transparent outline-none text-white w-full placeholder-white/40'
                            />
                        </div>
                    </div>

                    <button
                        onClick={fetchList}
                        className='h-11 px-4 rounded-[10px] bg-white/10 text-white hover:bg-white/20'
                    >
                        刷新
                    </button>

                    <button
                        onClick={onOpenModal}
                        className='h-11 px-5 rounded-[20px] bg-[#aab3bb] text-black font-semibold hover:opacity-90 disabled:opacity-60'
                        disabled={!isConnected || !address || !hasDid}
                        title={!isConnected || !address ? '请先连接钱包' : !hasDid ? '需先创建 DID' : '上传文件'}
                    >
                        + Upload
                    </button>
                </div>

                {/* 连接/无 DID 提示 */}
                {(!isConnected || !address) && (
                    <div className='text-white/80'>请先连接钱包后查看文件列表。</div>
                )}
                {isConnected && address && !hasDid && (
                    <div className='text-white/80'>尚未创建 DID，创建后可查看与上传文件。</div>
                )}

                {/* 列表 */}
                {canWork && (
                    <div className='rounded-[12px] border border-white/15 overflow-hidden'>
                        <div className='grid grid-cols-[2fr,1fr,1.5fr,1.2fr,2fr,1.5fr] px-4 py-3 text-white/70 text-sm bg-white/5'>
                            <span>Name</span>
                            <span>Size</span>
                            <span>Upload Time</span>
                            <span>Storage Network</span>
                            <span>DID</span>
                            <span>Operate</span>
                        </div>
                        {loading ? (
                            <div className='p-6 text-white/60'>加载中…</div>
                        ) : filtered.length === 0 ? (
                            <div className='p-6 text-white/60'>暂无文件</div>
                        ) : (
                            filtered.map((f) => (
                                <div key={f.cid} className='grid grid-cols-[2fr,1fr,1.5fr,1.2fr,2fr,1.5fr] px-4 py-3 border-t border-white/10 items-center text-white'>
                                    <span className='truncate'>{f.name}</span>
                                    <span>{formatSize(f.size)}</span>
                                    <span className='text-white/80'>{fmtTime(f.uploadtime)}</span>
                                    <span className='text-white/80'>{f.network || 'MEFS'}</span>
                                    <span className='text-white/80 font-mono'>{ellipsisMiddle(f.mdid)}</span>
                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => onDownload(f)} className='px-3 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sm'>下载</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* 上传弹窗 */}
                {openModal && (
                    <div className='fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center'>
                        <div className='w-[92%] max-w-3xl rounded-[18px] border border-[#05F292] bg-[#041a13] p-6'>
                            <div className='flex items-center justify-between mb-5'>
                                <button onClick={() => setOpenModal(false)} className='text-white/80 hover:text-white inline-flex items-center gap-2' disabled={uploading}>
                                    <span className='text-xl'>←</span><span>返回</span>
                                </button>
                                <p className='font-bold text-white text-[18px]'>Upload File</p>
                                <span className='w-6' />
                            </div>

                            <div
                                onDragOver={onDragOver}
                                onDragEnter={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                onClick={onBrowse}
                                className={`w-full h-[180px] rounded-[12px] border-2 border-dashed transition-colors cursor-pointer
                ${dragActive ? 'border-[#05F292] bg-[#05F29214]' : 'border-white/25 bg-white/5'}
                flex flex-col items-center justify-center text-center px-6`}
                            >
                                <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg.white/10 text-white/80 mb-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                    </svg>
                                </span>
                                <p className='text-xs text-white/70'>{file ? `已选择：${file.name}` : 'Click this area to upload'}</p>
                                <input ref={inputRef} type='file' className='hidden' onChange={onInputChange} />
                            </div>

                            <div className='mt-5 flex flex-col gap-4'>
                                <div>
                                    <label className='block text-sm text-white/80 mb-2'>File Name</label>
                                    <input
                                        value={fileName}
                                        onChange={(e) => setFileName(e.target.value)}
                                        placeholder='输入文件名'
                                        className='w-full h-10 rounded-[8px] bg-white/5 border border-white/20 px-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#05F292]/40'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm text-white/80 mb-2'>Storage Network</label>
                                    <select
                                        value={network}
                                        onChange={(e) => setNetwork(e.target.value as 'MEFS')}
                                        className='w-full h-10 rounded-[8px] bg-white/5 border border-white/20 px-3 text-white focus:outline-none'
                                    >
                                        <option value='MEFS'>MEFS</option>
                                    </select>
                                </div>

                                <button
                                    onClick={onSubmit}
                                    disabled={!file || uploading}
                                    className={`mt-2 h-11 rounded-[24px] w-full font-semibold
                  ${!file || uploading ? 'bg-white/20 text-white/60 cursor-not-allowed' : 'bg-[#05F292] text-black hover:opacity-90'}`}
                                >
                                    {uploading ? 'Uploading…' : 'Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}