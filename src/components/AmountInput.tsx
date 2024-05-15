import { ChangeEvent, ReactNode } from "react";

interface Props {
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  value: number;
  placeholder: string;
}

export function AmountInput({
  type,
  onChange,
  children,
  value,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={type} className="text-m font-normal text-white">
        {children}
      </label>
      <div className="border-2 border-white	rounded-xl p-2 w-32 md:w-48">
        <input
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className="bg-backgroundBlack p-2 outline-none w-28 text-white"
        />
      </div>
    </div>
  );
}
