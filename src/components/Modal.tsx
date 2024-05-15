import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  className: string;
}

export default function Modal({ children, className }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={className}>{children}</div>
    </div>
  );
}
