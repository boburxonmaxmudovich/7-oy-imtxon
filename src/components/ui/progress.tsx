import React from "react";

interface ProgressProps {
  value: number; // foiz qiymat
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress;
