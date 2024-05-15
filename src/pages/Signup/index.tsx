import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import ChangeAuthMethodText from "@/components/ChangeAuthMethodText";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSigup(event: FormEvent) {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await signUp(name, email, password);
      toast.success("Conta criada com sucesso!");
      setLoading(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email já esta sendo usado");
        }
      }
      setLoading(false);
    }
  }

  return (
    <main className="bg-fundoAuth bg-cover bg-no-repeat h-screen bg-center md:bg-top">
      <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
        <AuthCard titleMethod="Criar conta">
          <form onSubmit={handleSigup} className="flex flex-col w-72">
            <Input onChange={(e) => setName(e.target.value)} type="name">
              Nome Completo:
            </Input>
            <Input onChange={(e) => setEmail(e.target.value)} type="email">
              Email:
            </Input>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            >
              Senha:
            </Input>

            {loading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
            ) : (
              <Button type="submit" disabled={false} className="w-full">
                Criar conta
              </Button>
            )}
          </form>
          <ChangeAuthMethodText text="Já tem uma conta?">
            <a
              onClick={() => navigate("/login")}
              className="font-semibold underline cursor-pointer"
            >
              Entrar
            </a>
          </ChangeAuthMethodText>
        </AuthCard>
      </div>
    </main>
  );
}
