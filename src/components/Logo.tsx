import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

type LogoProps = {
  className: string;
};

export default function Logo({ className }: LogoProps) {
  const navigate = useNavigate();
  return (
    <div className={className} onClick={() => navigate("/dashboard")}>
      <img src={logo} alt="logo" className="w-6 md:w-8 cursor-pointer" />
      <h2 className="text-white ml-1 md:ml-2 cursor-pointer">BootPlay</h2>
    </div>
  );
}
