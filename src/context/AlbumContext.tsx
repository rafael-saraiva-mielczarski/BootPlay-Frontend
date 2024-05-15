import { AlbumModel } from "@/models/AlbumModel";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { album_api } from "@/services/apiService";

interface AlbumContextModel extends AlbumModel {
  albumData: AlbumModel[];
  albumCollection: AlbumModel[];
  searchAlbum: (searcText: string) => Promise<string | void>;
  albumSale: (
    name?: string,
    idSpotify?: string,
    artistName?: string,
    imageUrl?: string,
    value?: number
  ) => Promise<string | void>;
  getUserCollection: () => Promise<string | void>;
}

export const AlbumContext = createContext({} as AlbumContextModel);

interface Props {
  children: ReactNode;
}

export const AlbumProvider: FC<Props> = ({ children }) => {
  const [albumData, setAlbumData] = useState<AlbumModel[]>([]);
  const [albumCollection, setAlbumCollection] = useState<AlbumModel[]>([]);

  const SearchAlbum = useCallback(async (searchText: string) => {
    const authData = localStorage.getItem("@Auth.Data");
    const userToken = localStorage.getItem("@UserToken");

    if (authData) {
      album_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
      const respAlbums = await album_api.get(
        `/albums/all?search=${searchText}`
      );

      setAlbumData(respAlbums.data);
      console.log(respAlbums.data);
    } else {
      throw new Error(
        "Não há dados de autenticação armazenados no localStorage."
      );
    }
  }, []);

  const AlbumSale = useCallback(
    async (
      name?: string,
      idSpotify?: string,
      artistName?: string,
      imageUrl?: string,
      value?: number
    ) => {
      const authData = localStorage.getItem("@Auth.Data");
      const userToken = localStorage.getItem("@UserToken");

      if (authData) {
        try {
          album_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
          const respSelectedAlbum = await album_api.post("/albums/sale", {
            name,
            idSpotify,
            artistName,
            imageUrl,
            value,
          });

          console.log(respSelectedAlbum.data);
        } catch (error) {
          console.error("Erro ao comprar o álbum:", error);
        }
      }
    },
    []
  );

  const GetUserCollection = useCallback(async () => {
    const authData = localStorage.getItem("@Auth.Data");
    const userToken = localStorage.getItem("@UserToken");

    if (authData) {
      try {
        album_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
        const respUserCollection = await album_api.get("/albums/my-collection");
        setAlbumCollection(respUserCollection.data);
        console.log("colection useEffect", albumCollection);
        console.log(respUserCollection.data);
      } catch (err) {
        console.error("Erro ao procurar os albums", err);
      }
    }
  }, []);

  return (
    <AlbumContext.Provider
      value={{
        albumData,
        albumCollection,
        searchAlbum: SearchAlbum,
        albumSale: AlbumSale,
        getUserCollection: GetUserCollection,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
