import React from "react";
import { createPortal } from "react-dom";

import { useDevice } from "../../hooks/auth/useDevice";

interface DeckRegisterProps {}

export const DeckRegister: React.FC<DeckRegisterProps> = () => {
  const {
    name,
    authenticated,
    error,
    handleNameChange,
    handleRegister,
    handlesync,
  } = useDevice();

  return createPortal(
    <>
      <input type="checkbox" id="webauth-dialog" className="modal-toggle" />
      <label htmlFor="webauth-dialog" className="modal cursor-pointer">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        >
          <input
            type="text"
            placeholder="Deck Name"
            className="input w-full"
            value={name ?? ""}
            onChange={handleNameChange}
            disabled={authenticated}
          />
          {authenticated ? (
            <p className="text-green-500">Authenticated</p>
          ) : (
            <>
              <button onClick={handleRegister} className="btn-primary btn">
                Register
              </button>
              <button onClick={handlesync} className="btn-secondary btn">
                Sync
              </button>
            </>
          )}
          {<p className="text-red-500">{error}</p>}
        </label>
      </label>
    </>,
    document.body
  );
};
