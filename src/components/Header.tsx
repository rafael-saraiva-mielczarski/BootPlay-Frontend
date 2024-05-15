import Logo from "./Logo";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <div className="flex flex-row py-2 bg-header w-full px-3 md:px-24 backdrop-blur-lg">
      <Logo className="grow flex items-center" />
      {children}
    </div>
  );
}
