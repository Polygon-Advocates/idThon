import { nanoid } from "nanoid";
import React, { useState, useMemo, useContext } from "react";
import { a, useTransition } from "@react-spring/web";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  msg: string;
  duration?: number;
  type?: ToastType;
}

interface NotificationContextProps {
  add: (msg: string, duration?: number) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationsContext =
  React.createContext<NotificationContextProps>({
    add: () => {},
    dismiss: () => {},
    dismissAll: () => {},
  });

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const transitions = useTransition(toasts, {
    from: { opacity: 0, height: 0, life: "100%" },
    keys: (item: ToastProps) => item.id,
    enter: (item: ToastProps) => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ opacity: 1, height: refMap.get(item).offsetHeight });
      await next({ life: "0%" });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, item) => {
      setToasts((state) =>
        state.filter((i) => {
          return i.id !== item.id;
        })
      );
    },
    config: (_item, _index, phase) => (key) =>
      phase === "enter" && key === "life"
        ? { duration: 3000 }
        : { tension: 125, friction: 20, precision: 0.1 },
  });

  function handleAdd(msg: string, duration?: number) {
    const toast: ToastProps = { id: nanoid(), msg, duration };
    setToasts((state) => [...state, toast]);
  }

  function handleDismiss(id: string) {
    const item = toasts.find((i) => i.id === id);
    if (item && cancelMap.has(item)) {
      cancelMap.get(item)();
    }
  }

  function handleDismissAll() {
    toasts.forEach((item) => {
      if (cancelMap.has(item)) {
        cancelMap.get(item)();
      }
    });
  }

  return (
    <NotificationsContext.Provider
      value={{
        add: handleAdd,
        dismiss: handleDismiss,
        dismissAll: handleDismissAll,
      }}
    >
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-6 right-6 z-40 m-[0_auto] flex w-[0_auto] flex-col items-center sm:items-end">
          {transitions(({ life, ...style }, item) => (
            <a.li
              className="relative box-border w-full overflow-hidden sm:w-[40ch]"
              style={style}
            >
              <div
                className={`mt-2 grid h-auto grid-cols-[1fr_auto] gap-2 rounded-lg px-2 py-2 opacity-90 bg-[${
                  item.type ?? "info"
                }]`}
                ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
              >
                <a.div
                  className="absolute bottom-0 left-0 h-1 w-auto bg-[linear-gradient(130deg,#00b4e6,#00f0e0)]"
                  style={{ right: life }}
                />
                <p className="line-clamp-3 text-base">{item.msg}</p>
                <button
                  className="pointer-events-[all] m-0 flex cursor-pointer self-end overflow-hidden border-none bg-transparent p-0 pb-3 outline-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(item.id);
                  }}
                >
                  {/* <X size={18} /> */}
                  Dismiss
                </button>
              </div>
            </a.li>
          ))}
        </div>,
        document.body
      )}
    </NotificationsContext.Provider>
  );
};

export const useNotification = () => {
  const { add, dismiss, dismissAll } = useContext(NotificationsContext);

  return { add, dismiss, dismissAll };
};
