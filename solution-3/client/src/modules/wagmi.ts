import { createConfig, configureChains } from "wagmi";
import { optimismGoerli, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [optimismGoerli, optimism],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_VERCEL_ALCHEMY_ID ?? "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "WEFA",
  chains,
});

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export { chains, config };
