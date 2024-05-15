import { ReactNode } from "react";

type ChangeProps = {
  text: string;
  children: ReactNode;
};

export default function ChangeAuthMethodText({ text, children }: ChangeProps) {
  return (
    <>
      <p className="text-xs font-light mt-2">
        {text} {children}
      </p>
    </>
  );
}
