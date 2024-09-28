import React from "react";

const PlayerAvatar = ({
  rank,
  profileImage,
  username,
  size = "w-16",
  className,
}) => {
  return (
    <div className={`${className} h-fit relative ${size} rounded-full`}>
      <img className="rounded-full" alt={username} src={profileImage} />
      <div className="flex absolute rounded-full bottom-1 right-1 justify-center font-bold items-center text-black bg-primary w-5 h-5 p-2">
        <span>{rank}</span>
      </div>
    </div>
  );
};

export default PlayerAvatar;
