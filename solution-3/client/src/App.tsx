import { WagmiConfig } from "wagmi";
import { ErrorBoundary } from "@sentry/react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config, chains } from "./modules/wagmi";

import { AppProvider } from "./hooks/app/useApp";
import { WefaProvider } from "./hooks/wefa/useWefa";
import { SeedProvider } from "./hooks/wefa/useSeed";

import { Appbar } from "./components/Layout/AppBar";
import { Header } from "./components/Layout/Header";
// import { NotificationProvider } from "./components/Layout/Notifications";

import Views from "./views";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <AppProvider>
            <BrowserRouter>
              <WefaProvider>
                <SeedProvider>
                  <Header />
                  <Appbar />
                  <Views />
                  <ToastContainer
                    bodyClassName=""
                    progressClassName=""
                    // autoClose={3000}
                    closeButton={false}
                    limit={4}
                  />
                </SeedProvider>
              </WefaProvider>
            </BrowserRouter>
          </AppProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
}

export default App;
