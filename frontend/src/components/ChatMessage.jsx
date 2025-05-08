import React from 'react';

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isCurrentUser
            ? 'bg-blue-500/20 text-blue-100'
            : 'bg-white/5 text-gray-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            {message.sender?.name || 'Anonymous'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-1 text-sm break-words">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage; 