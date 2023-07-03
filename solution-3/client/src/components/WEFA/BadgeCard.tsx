import React from "react";
import { a, SpringValue } from "@react-spring/web";

export interface WefaBadgeCardProps extends WefaBadge {
  style?: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onClick?: () => void;
  isDesktop: boolean;
  paddingTop?: boolean;
}

export const WefaBadgeCard: React.FC<WefaBadgeCardProps> = ({
  name,
  Icon,
  description,
  style,
  onClick,
  isDesktop,
  paddingTop,
}) => {
  return (
    <a.li style={style}>
      <label
        htmlFor="badge-viewer-dialog"
        onClick={onClick}
        className={`${
          isDesktop ? "" : `${paddingTop ? "mt-16" : ""}`
        } unselectable card-compact card-side card bg-base-100 shadow-xl cursor-pointer py-2 px-2`}
      >
        <figure className="w-24 aspect-square object-cover rounded-lg">
          <img src={Icon} alt={name} />
        </figure>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="line-clamp-2">{description}</p>
        </div>
      </label>
    </a.li>
  );
};
