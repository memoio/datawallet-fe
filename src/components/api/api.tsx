
import axios from 'axios';
import { API_URL } from "../config/config";

export async function createDID(address: string) {
    const response = await axios.post(
        API_URL.CREATE_DID,
        {
            address: address
        },
        {
            headers: {
                "accept": "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result !== 1) {
        throw new Error(`${response.data.error}`);
    }

}

export async function getDIDInfo(address: string) {
    const response = await axios.get(
        API_URL.GET_DID_INFO,
        {
            params: {
                address: address
            },
            headers: {
                "accept": "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result !== 1) {
        throw new Error(`${response.data.error}`);
    }

    return response.data.data;
}

export async function uploadFile(address: string, did: string, name: string, file: File | Blob) {
    // 将文件读为 base64（不含 data: 前缀）
    const data = await blobToBase64(file);

    const res = await axios.post(
        API_URL.FILE_UPLOAD,
        { did, data, name, address },
        {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 60_000,
        }
    );

    if (res.status !== 200) throw new Error(`API request failed with status ${res.status}`);

    // 兼容后端可能的 Result/result 字段
    const ok = res.data?.result === 1 || res.data?.Result === 1;
    if (!ok) {
        const msg = res.data?.error || res.data?.Error || res.data?.message_en || res.data?.message || '上传失败';
        throw new Error(msg);
    }

    return res.data?.data ?? res.data; // 返回后端数据
}

// 将 Blob 转为 base64 字符串（去掉 data:*;base64, 前缀）
function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = String(reader.result || '');
            const base64 = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export async function downloadFile(
    did: string,
    cid: string,
    opts?: { filename?: string; mime?: string; autoSave?: boolean }
): Promise<{ blob: Blob; filename: string }> {
    const res = await axios.post(
        API_URL.FILE_DOWNLOAD,
        { did, cid },
        {
            headers: {
                accept: "*/*", // 后端返回二进制流
                "Content-Type": "application/json", // 仍以 JSON 传参
            },
            responseType: "arraybuffer",
            timeout: 120_000,
            onDownloadProgress: (e) => {
                // 可选：显示进度
                console.log('progress', e.loaded, e.total);
            }
        }
    );

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    // 从响应头推断文件名与类型
    const ct = res.headers?.["content-type"] || res.headers?.["Content-Type"] || "application/octet-stream";
    const cd = res.headers?.["content-disposition"] || res.headers?.["Content-Disposition"] || "";
    const fallbackName = `${cid}.bin`;
    const nameFromHeader = parseFilenameFromContentDisposition(cd) || opts?.filename || fallbackName;
    const mime = ct || opts?.mime || "application/octet-stream";

    const blob = new Blob([res.data], { type: mime });

    if (opts?.autoSave) {
        saveBlob(blob, nameFromHeader);
    }

    return { blob, filename: nameFromHeader };
}

// 解析 Content-Disposition 中的文件名
function parseFilenameFromContentDisposition(disposition: string): string | null {
    if (!disposition) return null;
    // RFC 5987: filename*=UTF-8''encoded
    const m1 = /filename\*\s*=\s*([^']*)''([^;]+)/i.exec(disposition);
    if (m1) {
        try { return decodeURIComponent(m1[2]); } catch { /* ignore */ }
    }
    const m2 = /filename\s*=\s*"([^"]+)"/i.exec(disposition) || /filename\s*=\s*([^;]+)/i.exec(disposition);
    if (m2) return m2[1].trim();
    return null;
}




function saveBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}


export async function listFiles(did: string): Promise<Array<{ cid: string; name: string; size: number; uploadtime: string; mdid: string; }>> {
    const res = await axios.get(
        API_URL.FILE_LIST,
        {
            params: { did },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 30_000,
        }
    )

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const ok = res.data?.result === 1 || res.data?.Result === 1;
    if (!ok) {
        const msg = res.data?.error
        throw new Error(msg);
    }

    type FileItem = { cid: string; name: string; size: number; uploadtime: string; mdid: string; };
    return (res.data?.data ?? []).map((item: FileItem) => ({
        cid: item.cid,
        name: item.name,
        size: item.size,
        uploadtime: item.uploadtime,
        mdid: item.mdid
    })) as Array<{ cid: string; name: string; size: number; uploadtime: string; mdid: string; }>;
}

export async function domainGetBindMsg(did: string, domain: string): Promise<string> {
    const res = await axios.get(
        API_URL.DOMAIN_BIND_SIGNMSG,
        {
            params: { did, domain },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 30_000,
        }
    )

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const ok = res.data?.result === 1;
    if (!ok) {
        const msg = res.data?.error
        throw new Error(msg);
    }

    return res.data?.data ?? '';
}

export async function domainBind(did: string, domain: string, sig: string): Promise<void> {
    const res = await axios.post(
        API_URL.DOMAIN_BIND,
        { did, domain, sig },
        {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 30_000,
        }
    )

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const ok = res.data?.result === 1;
    if (!ok) {
        const msg = res.data?.error
        throw new Error(msg);
    }
}

export async function domainList(did: string): Promise<string[]> {
    const res = await axios.get(
        API_URL.DOMAIN_LIST,
        {
            params: { did },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 30_000,
        }
    )

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    if (res.data?.result !== 1) {
        throw new Error(res.data?.error || '获取域名列表失败');
    }

    const raw = res.data?.data ?? [];
    type DomainItem = string | { domain?: string; name?: string; handle?: string };
    const names: string[] = (Array.isArray(raw) ? raw : [])
        .map((it: DomainItem) => typeof it === 'string' ? it : (it?.domain || it?.name || it?.handle || ''))
        .filter((s: string) => !!s);

    return Array.from(new Set(names)); // 去重后返回字符串数组
}

export async function domainAvailable(domain: string): Promise<boolean> {
    const res = await axios.get(
        API_URL.DOMAIN_AVAILABLE,
        {
            params: { domain },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            timeout: 30_000,
        }
    )

    if (res.status !== 200) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const result = res.data?.result;
    if (result === 1) return true;       // 可用
    if (result === 2) return false;      // 不可用

    // -1 或其他异常
    const msg = res.data?.error || '域名检查失败';
    throw new Error(msg);
}