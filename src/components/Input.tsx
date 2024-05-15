import { ChangeEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ children, type, onChange }: Props) {
  return (
    <>
      <label htmlFor={type} className="text-sm font-normal">
        {children}
      </label>
      <input
        type={type}
        onChange={onChange}
        className="bg-zinc-50 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3"
      />
    </>
  );
}
