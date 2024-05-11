import React from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { InputHTMLAttributes, forwardRef } from "react";

type InputFormProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  type: string;
  error?: any;
};
const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  function InputForm(
    { name, type, placeholder, className, onChange, error, ...rest },
    ref
  ) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    return (
      <div className="select-none">
        <div className="relative">
          <input
            className=" mb-1 appearance-none w-full shadow-md outline-none xl:py-2 py-1 px-3 rounded-lg ring-1 ring-stone-300 text-darkBlue focus:border-darkBlue focus:ring-1 focus:ring-darkBlue"
            placeholder={placeholder}
            onChange={onChange}
            type={showPassword ? "text" : type}
            name={name}
            ref={ref}
            {...rest}
          />
          {type === "password" && (
            <button
              type="button"
              className=" text-center absolute inset-y-0 right-0 m-2 outline-none text-darkBlue"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          )}
        </div>
        <div className="text-red-500 xl:text-sm text-xs md:h-1 h-0 mt-1 mb-6">
          {error && error.message}
        </div>
      </div>
    );
  }
);

InputForm.displayName = "InputForm"; // Thêm displayName cho component InputForm

export default InputForm;
