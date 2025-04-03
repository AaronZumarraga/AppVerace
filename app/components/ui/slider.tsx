import React from "react";
import "./slider.css"; // ✅ Correcto (minúscula)

type SliderProps = {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
};

export const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="slider"
    />
  );
};
