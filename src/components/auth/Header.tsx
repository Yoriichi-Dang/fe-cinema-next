import React from "react";
type HeaderProps = {
  title: string;
  content: string;
};

export default function Header({ title, content }: HeaderProps) {
  return (
    <div>
      <h1 className="text-darkBlue text-3xl font-bold mb-3">{title}</h1>
      <p className="text-darkBlue text-base">{content}</p>
    </div>
  );
}
