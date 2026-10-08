import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  icon?: React.ReactNode;
};

const Button = ({ text, className = "", icon }: ButtonProps) => {
  return (
    <button
      className={`bg-red-600 text-white px-2 py-2 rounded-lg flex gap-2  items-center justify-center ${className}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
