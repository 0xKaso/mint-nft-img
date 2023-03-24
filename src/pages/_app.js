import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultProvider } from 'ethers'
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';

import { WagmiConfig, configureChains, createClient, goerli } from 'wagmi';
import { mainnet, optimism, optimismGoerli,  } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [goerli],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'My First Layer2',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

export default function App({ Component, pageProps }) {
  return (
  //   <WagmiConfig client={client}>
  //           <Component {...pageProps} />
  // </WagmiConfig>
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      showRecentTransactions={true}
    >
            <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
  )
  // return <Component {...pageProps} />
}
