import { useEffect, useRef, useState } from "react";
import { AlbumModel } from "@/models/AlbumModel";
import { SearchInput } from "@/components/SearchInput";
import { useAlbum } from "@/hooks/useAlbum";
import { handleLink } from "@/utils/handleLink";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import user from "../../assets/user.jpeg";
import AlbumCard from "@/components/AlbumCard";
import HomeText from "@/components/HomeText";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import AlbumModalContent from "@/components/AlbumModalContent";
import HeaderAppContent from "@/components/HeaderAppContent";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel>();
  const {
    searchAlbum,
    albumData,
    albumSale,
    albumCollection,
    getUserCollection,
  } = useAlbum();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isCarouselRunning, setIsCarouselRunning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showingSearchResult, setShowingSearchResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getUserCollection();
        await searchAlbum("Rock");
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        setError("Erro ao buscar álbuns.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchAlbum, getUserCollection]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && carouselRef.current && isCarouselRunning) {
        carouselRef.current.scrollLeft += 2;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHovering, isCarouselRunning]);

  async function handleSearch() {
    if (!searchQuery) {
      toast.error("Preencha o campo de busca");
      return;
    }
    try {
      setIsLoading(true);
      await searchAlbum(searchQuery);
      setIsLoading(false);
      setShowingSearchResult(true);
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
      setError("Erro ao buscar álbuns.");
      setIsLoading(true);
    }
  }

  function handleAlbumClick(album: AlbumModel) {
    setSelectedAlbum(album);
    setShowModal(true);
    setIsCarouselRunning(false);
  }

  function handleClose() {
    setIsCarouselRunning(true);
    setShowModal(false);
  }

  async function handleAlbumSale(
    name?: string,
    idSpotify?: string,
    artistName?: string,
    imageUrl?: string,
    value?: number
  ) {
    try {
      const albumExistsInCollection = albumCollection.find(
        (album) => album.idSpotify === selectedAlbum?.id
      );

      if (albumExistsInCollection) {
        toast.error("Este álbum já está em sua coleção.");
        setShowModal(false);
        setIsCarouselRunning(true);
        return;
      }

      await albumSale(name, idSpotify, artistName, imageUrl, value);
      toast.success(`Álbum ${name} comprado!`);

      await getUserCollection();
    } catch (err) {
      toast.error("Erro ao comprar o álbum");
      console.error(err);
    }
  }

  return (
    <main className="flex flex-col justify-center h-full bg-fundoHome bg-cover bg-no-repeat bg-center md:bg-top">
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
          onClick={() => navigate("/profile")}
        />
      </Header>
      <HomeText />
      <div className="py-4 bg-gradient-to-b from-transparent to-backgroundBlack"></div>
      <section className="flex justify-center  py-4 bg-backgroundBlack">
        <SearchInput
          type="name"
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => {
            setShowingSearchResult(false);
            handleSearch();
          }}
        />
      </section>
      <h1 className="text-3xl md:text-4xl font-black text-white bg-backgroundBlack px-5 md:px-24">
        {showingSearchResult ? "Resultado" : "Trends"}
      </h1>
      <div className="w-full overflow-hidden bg-backgroundBlack">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <>
            <h1 className="text-2xl font-semibold text-white mb-24 pt-10 px-5 md:px-24">
              Ocorreu um erro ao buscar os álbuns!
              <br /> Tente novamente mais tarde
            </h1>
          </>
        ) : (
          <div className="max-w-screen-lg px-5 md:px-24 pb-16">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto"
              style={{
                overflowX: "hidden",
                width: "1330px",
                padding: "20px 0",
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {albumData?.map((album, i: number) => (
                <AlbumCard
                  key={i}
                  albumName={album.name}
                  onClick={() => handleAlbumClick(album)}
                  image={album.images[0].url}
                  value={album.value}
                  style="bg-[image:var(--bg-fundoAuth)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {showModal && selectedAlbum && (
        <Modal className="bg-white rounded-2xl w-[350px] md:w-[600px] h-[300px]">
          <AlbumModalContent
            onOpenLink={() =>
              handleLink(selectedAlbum.externalUrls.externalUrls.spotify)
            }
            onClose={handleClose}
            image={selectedAlbum.images[0].url}
            name={selectedAlbum.name}
            artists={selectedAlbum.artists[0].name}
            releaseDate={selectedAlbum.releaseDate}
            value={selectedAlbum.value}
            onClick={() =>
              handleAlbumSale(
                selectedAlbum.name,
                selectedAlbum.id,
                selectedAlbum.artists[0].name,
                selectedAlbum.images[0].url,
                selectedAlbum.value
              )
            }
          />
        </Modal>
      )}
    </main>
  );
}
