import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function NoAlbumsInCollection() {
  const navigate = useNavigate();

  return (
    <div className="bg-backgroundBlack flex flex-col ml-8 md:ml-12 mr-6">
      <h1 className="text-3xl text-white font-bold mb-2">
        Parece que você ainda não comprou nenhum álbum
      </h1>
      <p className="text-xl text-white font-semibold mb-4">
        Volte para o dashboard e encontre seus álbuns favoritos
      </p>
      <Button
        variant="blue"
        size="large"
        className="w-40 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Explorar Álbuns
      </Button>
    </div>
  );
}
