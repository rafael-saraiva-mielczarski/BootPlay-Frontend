import { AlbumContext } from "@/context/AlbumContext";
import { useContext } from "react";

export const useAlbum = () => useContext(AlbumContext);
