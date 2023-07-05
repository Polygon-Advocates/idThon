import { a, config, useSpring } from "@react-spring/web";
import { Link, useLocation } from "react-router-dom";

import { useApp } from "../../hooks/app/useApp";

import { RC as CardsIcon } from "../../assets/icons/cards.svg";
import { RC as WorldIcon } from "../../assets/icons/world.svg";

const tabs: {
  path: string;
  title: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}[] = [
  {
    path: "/deck",
    title: "Deck",
    Icon: CardsIcon,
  },

  {
    path: "/explore",
    title: "Explore",
    Icon: WorldIcon,
  },
];

export const Appbar = () => {
  const { pathname } = useLocation();
  const { isDesktop } = useApp();

  const spring = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
    config: {
      ...config.slow,
      friction: 48,
      clamp: true,
    },
  });

  {
    /* Added a Div  to center Nav bar */
  }
  return (
    <a.nav
      className={
        isDesktop
          ? "relative tabs w-full bg-base-100 rounded-3xl py-2 px-4 max-w-2xl flex justify-around items-center shadow-lg mx-auto mt-16 z-10"
          : "btm-nav z-20 bg-base-100 py-4 fixed bottom-0"
      }
      style={spring}
    >
      {tabs.map(({ path, Icon, title }) => (
        <Link to={path} key={title}>
          <button
            className={`flex flex-col items-center ${
              pathname === path ? "active tab-active" : ""
            } ${isDesktop ? "tab" : ""}}`}
          >
            <Icon
              width={32}
              height={32}
              className={`${
                pathname === path ? "fill-primary" : "fill-neutral"
              }`}
            />
            <p
              className={`text-sm tracking-wide ${
                pathname === path ? "text-primary" : "text-neutral"
              }`}
            >
              {title}
            </p>
          </button>
        </Link>
      ))}
    </a.nav>
  );
};
