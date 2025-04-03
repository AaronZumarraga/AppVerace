import React from "react";

export const Input = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      className="p-2 border rounded-lg w-full"
    />
  );
};
