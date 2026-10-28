import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ text, className = "", icon, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white px-2 py-2 rounded-lg flex   items-center justify-center ${className}`}
      onClick={onClick}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
