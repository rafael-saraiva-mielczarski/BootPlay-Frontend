import { WalletModel } from "@/models/WalletModel";
import { user_api } from "@/services/apiService";
import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface WalletContextModel extends WalletModel {
  getWallet: () => Promise<string | void>;
  addCredit: (amount: number) => Promise<string | void>;
  walletData?: WalletModel;
}

export const WalletContext = createContext({} as WalletContextModel);

interface Props {
  children: ReactNode;
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const [walletData, setWalletData] = useState<WalletModel>();

  const GetWallet = useCallback(async () => {
    const authData = localStorage.getItem("@Auth.Data");
    const userToken = localStorage.getItem("@UserToken");

    if (authData) {
      try {
        user_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
        const respUserWallet = await user_api.get("/wallet/");
        setWalletData(respUserWallet.data);
        console.log("colection useEffect", respUserWallet);
        console.log(respUserWallet.data);
      } catch (err) {
        console.error("Erro ao procurar os albums", err);
      }
    }
  }, []);

  const AddCredit = useCallback(async (value: number) => {
    const authData = localStorage.getItem("@Auth.Data");
    const userToken = localStorage.getItem("@UserToken");

    if (authData) {
      try {
        user_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
        const respCreditValueWallet = await user_api.post(
          `/wallet/credit/${value}`
        );
        console.log(respCreditValueWallet.data);
      } catch (err) {
        console.error("Erro ao procurar os albums", err);
      }
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletData: walletData,
        getWallet: GetWallet,
        addCredit: AddCredit,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
