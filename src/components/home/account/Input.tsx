import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  children?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ name, children, ...props }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <label
        className="text-purple-500 font-bold text-base mb-2"
        htmlFor={name}
      >
        {name}
      </label>
      <div className="bg-darkPurple p-4 w-full rounded-xl flex gap-4 items-center">
        {children}
        <input
          className="text-white text-base font-semibold bg-transparent outline-none"
          name={name}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
