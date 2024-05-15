import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import ChangeAuthMethodText from "@/components/ChangeAuthMethodText";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login efetuado com sucesso!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
        } else if (error.response.status === 404) {
          toast.error("Usuário não encontrado. Verifique seu e-mail e senha.");
        } else {
          toast.error("Erro ao efetuar o login. Tente novamente mais tarde.");
        }
      }
    }
  }

  return (
    <>
      {isAuthenticated && <Navigate to="/dashboard" />}
      <div className="bg-fundoAuth bg-cover bg-no-repeat h-screen bg-center md:bg-top">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          <AuthCard titleMethod="Acesse sua conta">
            <form onSubmit={handleLogin} className="flex flex-col w-72">
              <Input onChange={(e) => setEmail(e.target.value)} type="email">
                Email:
              </Input>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              >
                Senha:
              </Input>
              <Button type="submit" variant="black" className="w-full">
                Entrar
              </Button>
            </form>
            <ChangeAuthMethodText text="Ainda não tem uma conta?">
              <a
                onClick={() => navigate("/register")}
                className="font-semibold underline cursor-pointer"
              >
                Inscrever-se
              </a>
            </ChangeAuthMethodText>
          </AuthCard>
        </div>
      </div>
    </>
  );
}
