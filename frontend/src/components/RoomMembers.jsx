import React from "react";
import Avatar from "react-avatar";

const RoomMembers = ({ username }) => {
  if (!username) return null;
  
  return (
    <div className="flex items-center gap-3">
      <Avatar name={username} size={50} round="14px" />
      <span className="text-white">{username}</span>
    </div>
  );
};

export default RoomMembers;
