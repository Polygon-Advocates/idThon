import { a, useTransition } from "@react-spring/web";

import { avatar } from "../../constants";

import { useApp } from "../../hooks/app/useApp";
import { ProfileDataProps, ProfileTab } from "../../hooks/views/useProfile";

import { ProfileInfo } from "../../components/Profile/Info";
import { ProfileBadges } from "../../components/Profile/Badges"; // Badges
import { ProfileSettings } from "../../components/Profile/Settings";

const tabs: ProfileTab[] = ["harvest", "settings"];

interface ProfileProps extends ProfileDataProps {}

export const Profile: React.FC<ProfileProps> = ({
  badges,
  tab,
  changeTab,
  tabsSpring,
  avatarSpring,
}) => {
  const { isDesktop } = useApp();

  return (
    <section
      className={`overflow-hidden ${
        isDesktop ? "bg-inherit" : "bg-primary"
      } profile-view flex-col justify-center`}
    >
      <ProfileInfo avatar={avatar} avatarSpring={avatarSpring} />
      <a.div
        style={tabsSpring}
        className="profile-tabs relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        <div
          className={`${
            isDesktop ? "-top-24 left-6" : "top-3 left-3"
          } absolute tabs tabs-boxed rounded-xl w-fit z-10`}
        >
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize w-20 ${
                name === tab ? "tab-active" : ""
              }`}
              onClick={() => changeTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
        <div className="h-full">
          {tab === "harvest" && (
            <ProfileBadges badges={badges} isDesktop={isDesktop} />
          )}
          {/* {tab === "wallet" && <ProfileWallet />} */}
          {tab === "settings" && <ProfileSettings />}
        </div>
      </a.div>
    </section>
  );
};

export default Profile;
