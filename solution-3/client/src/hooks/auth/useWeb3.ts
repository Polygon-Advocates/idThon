import { useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { toast } from "react-toastify";

export const useAuthWeb3 = () => {
  const { address } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector({}),
  });
  const { disconnectAsync } = useDisconnect();

  const [error, setError] = useState<null | string>(null);

  async function handleConnect(): Promise<void> {
    try {
      setError(null);
      await connectAsync();

      toast.success("Connected!");
    } catch (err: any) {
      err && err.message && setError(err.message);
      toast.error("Something went wrong!");
      console.error("ERROR CONNECTING WALLET", err);
    }
  }

  async function handleDisconnect(): Promise<void> {
    try {
      setError(null);
      await disconnectAsync();

      toast.success("Disconnected!");
    } catch (err: any) {
      err && err.message && setError(err.message);
      toast.error("Something went wrong!");
      console.error("ERROR DICONNECTING WALLET", err);
    }
  }

  return {
    error,
    address,
    handleConnect,
    handleDisconnect,
  };
};
