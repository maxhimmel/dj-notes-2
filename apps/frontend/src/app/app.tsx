import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@trpc/frontend";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import { Route, Routes } from "react-router";
import Home from "../home/home";

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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
