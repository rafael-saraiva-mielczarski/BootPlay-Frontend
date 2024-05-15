import Header from "@/components/Header";
import user from "../../assets/user.jpeg";
import { useNavigate } from "react-router-dom";
import { FiDollarSign } from "react-icons/fi";
import DetailsCard from "@/components/DetailsCard";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AmountInput } from "@/components/AmountInput";

export default function Wallet() {
  const navigate = useNavigate();
  const { getWallet, walletData, addCredit } = useWallet();
  const [ammount, setAmmount] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getWallet();
        setIsLoading(false);
      } catch (error) {
        toast.error("Erro ao buscar os dados da carteira");
        console.error("Erro ao buscar os dados da carteira:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getWallet]);

  async function handleCreditAdition(value: number) {
    if (!ammount) {
      toast.error("Adicione um valor");
      return;
    }

    if (ammount < 0) {
      toast.error("Não é possível adicionar um valor negativo");
      return;
    }
    try {
      await addCredit(value);
      await getWallet();
      setAmmount();
      toast.success("Valor creditado com sucesso!");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(
          "Erro ao adicionar, verifique se o valor esta no formato: 10.00"
        );
      }
    }
  }

  return (
    <div className="bg-backgroundBlack h-screen">
      <Header>
        <p
          className="text-white text-sm md:text-1xl mr-2 md:mr-12 flex items-center cursor-pointer"
          onClick={() => navigate("/myDiscs")}
        >
          Meus Discos
        </p>
        <p
          className="text-white text-sm md:text-1xl mr-2 md:mr-12 font-semibold flex items-center cursor-pointer"
          onClick={() => navigate("/wallet")}
        >
          Carteira
        </p>
        <img
          src={user}
          alt="usuario"
          className="w-10 h-10 flex items-center rounded-full bg-sysmapLight border-2 cursos-pointer"
          onClick={() => navigate("/profile")}
        />
      </Header>
      <h1 className="text-4xl font-bold text-white mt-32 ml-8 md:20 pb-8">
        Minha Carteira
      </h1>
      <div className="flex flex-col w-80 md:w-[600px] md:flex-row ml-8 md:20 mr-4">
        <DetailsCard
          title="Saldo"
          value={isLoading ? "Carregando..." : `R$ ${walletData?.balance}`}
        >
          <FiDollarSign className="text-white w-6 h-6" />
        </DetailsCard>
        <DetailsCard
          title="Pontos"
          value={isLoading ? "Carregando..." : walletData?.points}
        >
          <FiDollarSign className="text-white w-6 h-6" />
        </DetailsCard>
      </div>
      <h2 className="text-xl font-regular text-white mb-4 ml-8 md:20">
        {walletData?.balance >= 0
          ? "Seu saldo na conta é positivo, mas você pode adicionar mais abaixo."
          : "Seu saldo na conta é negativo, adicione mais abaixo para ficar com saldo positivo."}
      </h2>
      <div className="flex pl-8 pd:20 pb-40 items-end bg-backgroundBlack">
        <AmountInput
          type="name"
          value={ammount}
          placeholder="00.00"
          onChange={(e) => setAmmount(e.target.value)}
        >
          Valor
        </AmountInput>
        <Button
          variant="add"
          size="add"
          className="ml-2"
          onClick={() => handleCreditAdition(ammount)}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}
