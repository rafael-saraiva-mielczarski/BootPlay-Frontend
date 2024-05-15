import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { StrictMode } from "react";
import { AlbumProvider } from "./context/AlbumContext";
import { PrivateRoutes } from "./utils/privateRoutes";
import ReactDOM from "react-dom/client";
import "./global.css";
import Landing from "./pages/Landing";
import MyDiscs from "./pages/MyDiscs";
import Wallet from "./pages/Wallet";
import { WalletProvider } from "./context/WalletContext";
import Profile from "./pages/Profile";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    <BrowserRouter>
      <AuthProvider>
        <AlbumProvider>
          <WalletProvider>
            <Routes>
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing />} />
              <Route path="" element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/myDiscs" element={<MyDiscs />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </WalletProvider>
        </AlbumProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
