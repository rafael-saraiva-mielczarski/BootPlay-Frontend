import { MdClose } from "react-icons/md";
import { Button } from "./ui/button";
import { UserDetailsInput } from "./UserDetailsInput";

interface UserDetailsContentProps {
  name?: string;
  email?: string;
  password?: string;
  onClose: () => void;
  onClick: () => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserDetailsModalContent({
  name,
  password,
  email,
  onClose,
  onClick,
  onChangeName,
  onChangeEmail,
  onChangePassword,
}: UserDetailsContentProps) {
  return (
    <div className="flex flex-1 pt-2 px-4 pb-4">
      <div className="flex flex-col justify-evenly">
        <div className="bg-lightGray rounded-2xl  p-1 self-end">
          <MdClose onClick={onClose} className="cursor-pointer w-5 h-5" />
        </div>
        <div className="flex flex-col w-[250px] md:w-[312px]">
          <UserDetailsInput type="name" onChange={onChangeName}>
            Nome: {name}
          </UserDetailsInput>
          <UserDetailsInput type="name" onChange={onChangeEmail}>
            Email: {email}
          </UserDetailsInput>
          <UserDetailsInput type="name" onChange={onChangePassword}>
            Senha: {password}
          </UserDetailsInput>
        </div>

        <Button variant="add" size="large" onClick={onClick} className="w-full">
          Salvar{" "}
        </Button>
      </div>
    </div>
  );
}
