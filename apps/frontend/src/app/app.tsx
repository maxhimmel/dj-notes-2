import { QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@trpc/frontend";
import { BrowserRouter, Route, Routes } from "react-router";
import SessionProvider from "../auth/sessionProvider";
import Home from "../home/home";
import Navbar from "../navbar/navbar";
import TrpcProvider from "../trpc";

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <TrpcProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />}></Route>
          </Routes>
        </TrpcProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
