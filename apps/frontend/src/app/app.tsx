import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@trpc/frontend";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import SessionProvider from "../auth/sessionProvider";
import Home from "../home/home";
import Navbar from "../navbar/navbar";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // TODO: Move these into .env vars?
        httpBatchLink({ url: "http://localhost:4200/api" }), //frontend dev
        httpBatchLink({ url: "http://localhost:3333/api" }), //backend dev
      ],
    })
  );

  return (
    <BrowserRouter>
      <SessionProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Routes>
              <Route index element={<Home />}></Route>
            </Routes>
          </QueryClientProvider>
        </trpc.Provider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
