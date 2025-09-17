/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { getDefaultConfig, Chain, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet,
  tokenPocketWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  bsc,
} from 'wagmi/chains';

const memoriae = {
  id: 985,
  name: 'Memo Megrez',
  iconUrl: "https://chainid.network/static/6071898808832085d8e37c29493ab0e3/927d1/memo.webp",
  rpcUrls: {
    default: {
      http: ["https://chain.metamemo.one:8501"],
    }
  },
  nativeCurrency: {
    name: 'Memo Megrez',
    symbol: 'CMEMO',
    decimals: 10,
  },
} as const as Chain;


const hashkey = {
  id: 177,
  iconUrl: "https://hsk.xyz/static/logo.png",
  name: "HashKey Chain",
  rpcUrls: {
    default: {
      http: ["https://mainnet.hsk.xyz"],
    }
  },
  nativeCurrency: {
    decimals: 18,
    name: 'HashKey EcoPoints',
    symbol: 'HSK',
  },
} as const as Chain


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, injectedWallet, tokenPocketWallet, coinbaseWallet],
    },
  ],
  {
    appName: 'data-wallet',
    projectId: '225e9255102f0125f8c36c490adcc7de',
  }
);

type ExtendedGetDefaultConfigParams = Parameters<typeof getDefaultConfig>[0] & {
  connectors: ReturnType<typeof connectorsForWallets>;
};

export const config = getDefaultConfig({
  connectors,
  appName: 'data-wallet',
  projectId: '225e9255102f0125f8c36c490adcc7de',
  chains: [
    hashkey,
    memoriae,
    mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    bsc,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
} as ExtendedGetDefaultConfigParams);

