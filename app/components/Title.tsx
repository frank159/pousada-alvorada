import type { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Aplica a fonte Herr Von Muellerhoff na primeira letra */
  scriptFirstLetter?: boolean;
  /**
   * Espaçamento entre a primeira letra e o restante do texto.
   * Só tem efeito quando `scriptFirstLetter` for `true`.
   * Aceita qualquer valor CSS (ex: "0.15em", "8px", "0.5rem").
   */
  firstLetterMargin?: string;
  className?: string;
};

function renderWithScriptFirstLetter(text: string, margin?: string) {
  const match = text.match(/^(\s*)(\S)([\s\S]*)$/);
  if (!match) return text;

  const [, leading, first, rest] = match;

  return (
    <>
      {leading}
      <span
        className="font-script text-[1.2em] leading-none"
        style={margin ? { marginRight: margin } : undefined}
      >
        {first}
      </span>
      {rest}
    </>
  );
}

export default function Title({
  children,
  as: Tag = "h1",
  scriptFirstLetter = false,
  firstLetterMargin,
  className = "",
}: TitleProps) {
  const content =
    scriptFirstLetter && typeof children === "string"
      ? renderWithScriptFirstLetter(children, firstLetterMargin)
      : children;

  return (
    <Tag
      className={[
        "font-cinzel font tracking-wide leading-[1.1] text-[#E1D5BF]",
        "text-[32px] md:text-[48px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {content}
    </Tag>
  );
}