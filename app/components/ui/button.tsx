import React from "react";
import "./button.css"; // Asegúrate de que la ruta es correcta

export const Button = ({ children, onClick, className = "" }: { 
  children: React.ReactNode, 
  onClick?: () => void,
  className?: string 
}) => {
  return (
    <button 
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};