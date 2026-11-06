import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center",
        "px-4 py-2",
        "font-sans text-base font-light tracking-wide",
        "cursor-pointer select-none",
        "bg-transparent text-[#E1D5BF] border border-[#E1D5BF]",

        "transition-colors duration-300 ease-in-out",
        "hover:bg-[#E1D5BF] hover:text-[#5C3E2E]",
        "focus:outline-none focus:ring-0",

        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}