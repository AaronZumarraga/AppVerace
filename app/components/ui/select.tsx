import React from "react";

type SelectProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      className="border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
