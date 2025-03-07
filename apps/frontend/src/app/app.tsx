import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import SessionProvider from "../auth/sessionProvider";
import Home from "../home/home";
import Navbar from "../navbar/navbar";
import SetList from "../setLists/setList";
import SetListCollection from "../setLists/setListCollection";
import TrpcProvider from "../trpc";
import SetListProvider from "../setLists/setListProvider";

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <TrpcProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route element={<SetListRoutes />}>
              <Route path="/setlists" element={<SetListCollection />} />
              <Route path="/setlists/:id" element={<SetList />} />
            </Route>
          </Routes>
        </TrpcProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

function SetListRoutes() {
  return (
    <SetListProvider>
      <Outlet />
    </SetListProvider>
  );
}

export default App;
