import React from 'react';
import { FaCopy, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const RoomInfo = ({ roomId, members, onLeaveRoom, currentUser }) => {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => toast.success('Room ID copied to clipboard!'))
      .catch(() => toast.error('Failed to copy room ID'));
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaUsers className="text-blue-400" />
          <h3 className="text-white font-semibold">
            Room Members ({members.length})
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-lg">
            <span className="text-gray-400 text-sm select-all">Room ID: {roomId}</span>
            <button
              onClick={copyRoomId}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy Room ID"
            >
              <FaCopy />
            </button>
          </div>
          <button
            onClick={onLeaveRoom}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors"
            title="Leave Room"
          >
            <FaSignOutAlt />
            <span>Leave</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {members.map((member) => (
          <div
            key={member.id}
            className={`${
              member.id === currentUser?.id 
                ? 'bg-blue-500/20 border-blue-500/50' 
                : 'bg-white/5'
            } px-3 py-2 rounded-lg flex items-center space-x-2 border border-white/10`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm truncate">
              {member.name} {member.id === currentUser?.id ? '(You)' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomInfo; 