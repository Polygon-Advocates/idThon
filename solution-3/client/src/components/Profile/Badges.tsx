import { useState } from "react";
import { createPortal } from "react-dom";

import { WefaBadgeCard } from "../WEFA/BadgeCard";
import { toast } from "react-toastify";

interface ProfileBadgesProps {
  badges: WefaBadge[];
  isDesktop: boolean;
}

export const ProfileBadges: React.FC<ProfileBadgesProps> = ({
  badges,
  isDesktop,
}) => {
  const [openBadge, setOpenBadge] = useState<WefaBadge | null>(null);

  function handleShare(type: BadgeType, image: string) {
    if (navigator.canShare && navigator.canShare()) {
      const blob = new Blob([image], { type: "image/png" });
      const file = new File([blob], "wefa-badge.png", { type: "image/png" });

      navigator.share({
        url: "https://wefa.app",
        title: `WEFA Badge Earned!`,
        text: `Got your badge yet? Just got my ${type.replace(
          "_",
          "  "
        )} badge on Wefa!`,
        files: [file],
      });
    } else {
      toast.error("Your browser does not support sharing.");
    }
  }

  return (
    <>
      <ul
        className={
          isDesktop
            ? "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-auto gap-6 pb-32 pt-6 h-full"
            : "flex flex-col overflow-scroll h-full gap-3 pb-20"
        }
        // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
      >
        {" "}
        {badges.map((badge, index) => (
          <WefaBadgeCard
            {...badge}
            key={badge.id}
            onClick={() => setOpenBadge(badge)}
            paddingTop={index === 0}
            isDesktop={isDesktop}
          />
        ))}
      </ul>
      {createPortal(
        <>
          <input
            type="checkbox"
            id="badge-viewer-dialog"
            className="modal-toggle"
          />
          <label htmlFor="badge-viewer-dialog" className="modal cursor-pointer">
            <label
              className="modal-box relative flex w-full sm:max-w-sm max-w-xs flex-col gap-4 items-center"
              htmlFor=""
            >
              {openBadge && (
                <>
                  <img src={openBadge.Icon} alt={openBadge.name} />
                  <h4 className="">{openBadge.name}</h4>
                  <p>{openBadge.description}</p>
                  <div className="flex gap-3">
                    <button
                      disabled={isDesktop}
                      className="btn btn-secondary btn-outline"
                      onClick={() => handleShare(openBadge.id, openBadge.Icon)}
                    >
                      Share
                    </button>
                    <button className="btn btn-primary" disabled>
                      Mint
                    </button>
                  </div>
                </>
              )}
            </label>
          </label>
        </>,
        document.body
      )}
    </>
  );
};
