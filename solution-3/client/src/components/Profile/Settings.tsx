import { themes, useApp } from "../../hooks/app/useApp";

interface ProfileSettingsProps {}

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const { theme, toggleTheme, handlseSetTheme } = useApp();

  return (
    <div className="flex flex-col gap-3 items-center mt-16">
      <div className="shadow-lg bg-base-100 px-3 py-6 rounded-xl w-full gap-3 flex flex-col max-w-xs">
        <h3 className="mb-3 font-bold text-2xl">Theme</h3>
        <select
          className="select select-primary w-full"
          value={theme}
          onChange={handlseSetTheme}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme} className="capitalize">
              {theme.toUpperCase()}
            </option>
          ))}
        </select>
        <label className=" label w-full">
          <span className="label-text text-xl font-semibold">
            Enable Dark Mode
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-lg"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </label>
      </div>
      {/* <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">Enable Explore & Play Sound</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onClick={toggleTheme}
            disabled
            checked={false}
          />
        </label>
      </div> */}
    </div>
  );
};
