import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Code Collaby Logo */}
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-blue-500/20 animate-pulse flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-400">CC</span>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-400/50 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-indigo-400/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Loading text with typing animation */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="global-loader" style={{ animationDelay: '0.1s' }}></div>
            <div className="global-loader" style={{ animationDelay: '0.2s' }}></div>
            <div className="global-loader" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
