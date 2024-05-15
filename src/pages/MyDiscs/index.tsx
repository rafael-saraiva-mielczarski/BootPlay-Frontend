import { useNavigate } from "react-router-dom";
import { useAlbum } from "@/hooks/useAlbum";
import { useEffect, useState } from "react";
import { LuFileVideo } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import Header from "@/components/Header";
import user from "../../assets/user.jpeg";
import AlbumCard from "@/components/AlbumCard";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import DetailsCard from "@/components/DetailsCard";
import NoAlbumsInCollection from "@/components/NoAlbumsInCollection";

export default function MyDiscs() {
  const [isLoading, setIsLoading] = useState(false);
  const { albumCollection, getUserCollection } = useAlbum();
  const navigate = useNavigate();
  const albumsInCollection = albumCollection.length;
  const totalValueInvested = albumCollection.reduce(
    (acc, currentItem) => acc + currentItem?.value,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getUserCollection();
        setIsLoading(false);
      } catch (error) {
        toast.error("Erro ao buscar os albums");
        console.error("Erro ao buscar coleção:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getUserCollection]);

  function handleSpotifyLink(albumId: string) {
    window.open(`https://open.spotify.com/intl-pt/album/${albumId}`, "_blank");
  }

  return (
    <div className="bg-backgroundBlack h-screen">
      <Header>
        <p
          className="text-white text-sm md:text-1xl font-semibold mr-2 md:mr-12 flex items-center cursor-pointer"
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
          onClick={() => navigate("/profile")}
        />
      </Header>
      <h1 className="text-4xl font-bold text-white mt-32 ml-8 md:20 pb-8">
        Meus Discos
      </h1>
      <div className="flex flex-col w-80 md:w-[600px] md:flex-row ml-8 md:20">
        <DetailsCard
          title="Total de Albuns"
          value={isLoading ? "Carregando.." : albumsInCollection}
        >
          <LuFileVideo className="text-white w-6 h-6" />
        </DetailsCard>
        <DetailsCard
          title="Valor investido"
          value={isLoading ? "Carregando.." : `R$ ${totalValueInvested}`}
        >
          <FiDollarSign className="text-white w-6 h-6" />
        </DetailsCard>
      </div>
      <div className="bg-backgroundBlack">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {albumCollection.length == 0 ? (
              <NoAlbumsInCollection />
            ) : (
              <div className="px-12 px:20 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {albumCollection?.map((album, i: number) => (
                  <AlbumCard
                    key={i}
                    albumName={album.name}
                    image={album.imageUrl}
                    value={album.value}
                    onClick={() => handleSpotifyLink(album.idSpotify)}
                    style="bg-[image:var(--bg-fundoAuth)] bg-cover bg-no-repeat w-72 h-[280px] rounded-md"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
