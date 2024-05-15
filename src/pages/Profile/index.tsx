import user from "../../assets/user.jpeg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import UserDetailsModalContent from "@/components/UserDetailsModalContent";
import UserDetaislCard from "@/components/UserDetailsCard";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("@Auth.Data"));
    const password = JSON.parse(localStorage.getItem("@Password"));
    setName(userDetails.name);
    setPassword(password);
    setId(userDetails.id);
    setEmail(userDetails.email);
  }, []);

  async function handleUpdateDetails() {
    if (!editedEmail || !editedName || !editedPassword) {
      toast.error("Preencha todas os campos!");
      return;
    }

    try {
      await updateUser(id, editedName, editedEmail, editedPassword);
      setName(editedName);
      setEmail(editedEmail);
      setPassword(editedPassword);
      setShowModal(false);
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Usuário não encontrado!");
      } else {
        toast.error("Erro ao atualizar dados do usuário!");
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
          className="text-white text-sm md:text-1xl mr-2 md:mr-12 flex items-center cursor-pointer"
          onClick={() => navigate("/wallet")}
        >
          Carteira
        </p>
        <img
          src={user}
          alt="usuario"
          className="w-10 h-10 flex items-center rounded-full bg-sysmapLight border-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </Header>
      <section className="w-[340px] ml-5 md:ml-12 mt-20 md:mt-28">
        <h1 className="text-4xl font-bold text-white pb-8">Meus dados</h1>
        <UserDetaislCard title="Id" value={id} />
        <UserDetaislCard title="Nome" value={name} />
        <UserDetaislCard title="Email" value={email} />
        <UserDetaislCard title="Senha" value={password} />
        <Button
          variant="blue"
          size="add"
          onClick={() => setShowModal(true)}
          className="w-[315px]"
        >
          Alterar dados
        </Button>
      </section>
      {showModal && (
        <Modal className="bg-white rounded-2xl">
          <UserDetailsModalContent
            name={name}
            password={password}
            email={email}
            onChangeEmail={(e) => setEditedEmail(e.target.value)}
            onChangeName={(e) => setEditedName(e.target.value)}
            onChangePassword={(e) => setEditedPassword(e.target.value)}
            onClose={() => setShowModal(false)}
            onClick={() => handleUpdateDetails()}
          />
        </Modal>
      )}
    </div>
  );
}
