import { BrowserRouter, Route, Routes } from "react-router";
import SessionProvider from "../auth/sessionProvider";
import Home from "../home/home";
import Navbar from "../navbar/navbar";
import SetList from "../setLists/setList";
import SetListCollection from "../setLists/setListCollection";
import TrpcProvider from "../trpc";

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <TrpcProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/setlists" element={<SetListCollection />} />
            <Route path="/setlists/:id" element={<SetList />} />
          </Routes>
        </TrpcProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
