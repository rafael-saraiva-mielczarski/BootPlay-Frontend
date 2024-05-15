import { removeDecimal } from "@/utils/removeDecimal";
import { MdClose } from "react-icons/md";
import { Button } from "./ui/button";

interface AlbumContentProps {
  image?: string;
  name?: string;
  artists?: string;
  releaseDate?: string;
  value?: number;
  onClose: () => void;
  onClick: () => void;
  onOpenLink: () => void;
}

export default function AlbumModalContent({
  image,
  name,
  artists,
  releaseDate,
  value,
  onClose,
  onClick,
  onOpenLink,
}: AlbumContentProps) {
  return (
    <div className="flex flex-1">
      <div
        style={
          {
            "--bg-fundoAuth": `url(${image})`,
          } as React.CSSProperties
        }
        className="bg-[image:var(--bg-fundoAuth)] bg-cover bg-no-repeat w-40 md:w-72 h-[300px] rounded-l-2xl cursor-pointer"
        onClick={onOpenLink}
      ></div>
      <div className="px-4 flex flex-col justify-evenly">
        <div className="flex w-[200px] md:w-[312px]">
          <h1 className="grow text-xl md:text-3xl font-black text-center self-end">
            {name}
          </h1>
          <div className="bg-lightGray rounded-2xl  p-1 self-start">
            <MdClose onClick={onClose} className="cursor-pointer w-5 h-5" />
          </div>
        </div>
        <h2 className="text-sm md:text-base">Artista: {artists}</h2>
        <p className="text-sm md:text-base">Lançando em: {releaseDate}</p>
        <p className="text-sm md:text-base">
          Valor: <span className="font-black">{removeDecimal(value)} R$</span>
        </p>
        <Button variant="buy" size="large" onClick={onClick} className="w-full">
          Comprar{" "}
        </Button>
      </div>
    </div>
  );
}
