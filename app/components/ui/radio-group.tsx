import React from "react";

export const RadioGroup = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};
