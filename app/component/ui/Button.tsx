import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
};

const Button = ({
  text,
  className = "",
  icon,
  iconPosition = "right",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`text-white px-2 py-2 rounded-lg flex   items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}

      {text}

      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
