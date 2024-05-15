import { ReactNode } from "react";

interface DetaislCardProps {
  children: ReactNode;
  title: string;
  value: string | number | undefined;
}

export default function DetaislCard({
  children,
  title,
  value,
}: DetaislCardProps) {
  return (
    <div className="shadow-discCard bg-discCard flex mr-6 mb-10 rounded-md pl-4 pr-12 py-3">
      <div className="bg-black p-2 rounded-full flex self-center mr-2">
        {children}
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium mb-1">{title}</p>
        <h1 className="text-2xl font-medium">{value}</h1>
      </div>
    </div>
  );
}
