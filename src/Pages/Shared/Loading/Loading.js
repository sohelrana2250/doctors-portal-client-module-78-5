import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">...</span>
      </div>
    </div>
  );
};

export default Loading;
