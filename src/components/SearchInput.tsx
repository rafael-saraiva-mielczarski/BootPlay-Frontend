import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export function SearchInput({ type, onChange, onClick }: Props) {
  return (
    <>
      <div className="border-2 border-white	rounded-xl p-2 px-4 w-80 md:w-96 flex">
        <input
          type={type}
          onChange={onChange}
          className="bg-backgroundBlack p-2 outline-none grow text-white"
        />
        <CiSearch
          onClick={onClick}
          className="text-white text-3xl self-center cursor-pointer"
        />
      </div>
    </>
  );
}
