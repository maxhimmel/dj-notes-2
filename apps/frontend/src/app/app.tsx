import { BrowserRouter, Route, Routes } from "react-router";
import SessionProvider from "../auth/sessionProvider";
import Home from "../home/home";
import Navbar from "../navbar/navbar";
import TrpcProvider from "../trpc";
import SetListCollection from "../setLists/setListCollection";

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <TrpcProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/setlists" element={<SetListCollection />}></Route>
          </Routes>
        </TrpcProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
