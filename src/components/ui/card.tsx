import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, color = "text-green-500", className }) => {
  return (
    <div
      className={`p-5 bg-white rounded-2xl shadow-sm border border-gray-100 
      hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>
        {icon && <div className={`${color} text-3xl`}>{icon}</div>}
      </div>

      <div className="w-full h-[3px] bg-gray-100 mt-4 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 w-0 hover:w-full transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default Card;
