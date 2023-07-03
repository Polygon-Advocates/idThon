import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
} from "@simplewebauthn/browser";
import {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/typescript-types";
import { useEffect, useState } from "react";

import { apiClient } from "../../modules/axios";
import { useNotification } from "../../components/Layout/Notifications";

type ErrorType =
  | "register"
  | "auth"
  | "webauthn-not-supported"
  | "already-registered"
  | "register-not-verified";

export function errorHandler(error: ErrorType | null) {
  switch (error) {
    case "register":
      return "Error registering";
    case "auth":
      return "Error logging in";
    case "webauthn-not-supported":
      return "WebAuthn not supported";
    default:
      return "Error";
  }
}

export const useDevice = () => {
  const [error, setError] = useState<null | ErrorType>(
    typeof window !== "undefined" && browserSupportsWebAuthn()
      ? null
      : "webauthn-not-supported"
  );
  const [name, setName] = useState<null | string>(
    typeof window !== "undefined" ? localStorage.getItem("deck_name") : null
  );
  const [authenticated, setAuthenticated] = useState(false);

  const {} = useNotification();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function handleRegister(): Promise<void> {
    if (!browserSupportsWebAuthn()) {
      setError("webauthn-not-supported");
      return;
    }

    if (!name) {
      setError("register");
      return;
    }

    let attResp: RegistrationResponseJSON;

    try {
      const { data } = await apiClient.post("/deck/register-options", {
        data: { name },
      });

      attResp = await startRegistration({
        ...data,
        user: { ...data.user, name, displayName: name },
      });
    } catch (err: any) {
      console.error("ERROR REGISTERING", err);
      // Some basic error handling
      if (err.name === "InvalidStateError") {
        setError("already-registered");
      } else {
        setError("register");
      }

      return;
    }

    try {
      const { data } = await apiClient.post<{ verified: boolean }>(
        "/deck/register",
        {
          data: attResp,
        }
      );

      if (!data.verified) {
        setError("register-not-verified");
      }

      // console.log("REGISTERED", data);
    } catch (err: any) {
      console.error("ERROR REGISTERING", err);
      setError("register");
    }
  }

  async function handlesync() {
    if (!browserSupportsWebAuthn()) {
      setError("webauthn-not-supported");
      return;
    }

    setError(null);

    let authResp: AuthenticationResponseJSON;

    try {
      const { data } = await apiClient.get("/deck/sync-options");

      authResp = await startAuthentication(data, true);
    } catch (error: any) {
      setError("auth");

      return;
    }

    try {
      const { data } = await apiClient.post<{}>("/deck/sync", authResp);

      setAuthenticated(true);

      // console.log("LOGGED IN", data);
    } catch (error: any) {
      setError("auth");
    }
  }

  useEffect(() => {
    // if (name) {
    //   handlesync();
    // }

    return () => {
      name && localStorage.setItem("deck_name", name);
    };
  }, []);

  return {
    name,
    authenticated,
    error,
    handleNameChange,
    handleRegister,
    handlesync,
  };
};
