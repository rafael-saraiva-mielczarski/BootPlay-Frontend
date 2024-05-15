import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useMediaQuery } from "@react-hook/media-query";

export default function Landing() {
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width: 640px)");

  return (
    <div className="relative bg-fundoAuth bg-cover bg-no-repeat bg-center h-screen">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header>
        <Button
          type="submit"
          disabled={false}
          variant="black"
          size="default"
          className="text-xs md:text-base w-24 md:w-44"
          onClick={() => navigate("/login")}
        >
          Entrar
        </Button>
        <Button
          type="submit"
          disabled={false}
          variant="blue"
          className="text-xs md:text-base ml-2 w-24 md:w-44"
          onClick={() => navigate("/register")}
        >
          Inscrever-se
        </Button>
      </Header>
      <div className="relative z-10 px-4 md:px-24 py-32">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4 leading-12">
          A história da música {isWideScreen && <br />}
          não pode ser {isWideScreen && <br />}
          esquecida!
        </h1>
        <p className="text-white text-xl md:text-2xl font-medium">
          Crie já sua conta e curta os sucessos que {isWideScreen && <br />}
          marcaram os tempos no Vinil.
        </p>
        <Button
          type="submit"
          disabled={false}
          variant="blue"
          size="large"
          className="text-xl mt-4 w-48 md:w-64"
          onClick={() => navigate("/register")}
        >
          Inscrever-se
        </Button>
      </div>
    </div>
  );
}
