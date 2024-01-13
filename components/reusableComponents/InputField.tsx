import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  inputType?: string;
  style?: React.CSSProperties;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  required,
  inputType = "text",
  style,
  handleChange,
  value,
  handleKeyDown,
}) => (
  <div className="flex flex-col w-full my-3">
    <label className="text-violet-950 font-medium">{label}</label>
    <input
      required={required}
      className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start focus:outline-none"
      type={inputType}
      name={name}
      placeholder={placeholder}
      style={style}
      onChange={handleChange}
      value={value}
      onKeyDown={handleKeyDown}
    />
  </div>
);

export default InputField;
