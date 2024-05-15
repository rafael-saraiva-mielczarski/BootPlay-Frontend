import { ReactNode } from "react";
import logo from "../assets/logo.svg";

type AuthCardProps = {
  children: ReactNode;
  titleMethod: string;
};

export default function AuthCard({ children, titleMethod }: AuthCardProps) {
  return (
    <div className="flex max-w-[544px] bg-white p-7 md:p-10 rounded-md">
      <div className="flex flex-col items-center w-full gap-2">
        <img src={logo} className="h-12" />
        <h1 className="text-xl font-semibold">{titleMethod}</h1>
        {children}
      </div>
    </div>
  );
}
