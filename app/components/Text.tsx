import type { ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
};

export default function Text({
  children,
  as: Tag = "p",
  className = "",
}: TextProps) {
  return (
    <Tag
      className={`text-[#E1D5BF] font-sans font-light text-[16px] leading-[1.1] ${className}`}
    >
      {children}
    </Tag>
  );
}