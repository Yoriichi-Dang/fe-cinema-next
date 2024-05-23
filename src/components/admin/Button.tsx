import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  children: React.ReactNode;
};
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        className={
          "p-3 bg-purple-500 border-2 border-solid border-purple-500 text-black font-bold text-lg hover:bg-transparent rounded-xl hover:text-purple-500 transition-all duration-300 ease-in"
        }
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
