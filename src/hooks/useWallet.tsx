import { WalletContext } from "@/context/WalletContext";
import { useContext } from "react";

export const useWallet = () => useContext(WalletContext);
