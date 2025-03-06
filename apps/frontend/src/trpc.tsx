import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@trpc/frontend";
import { PropsWithChildren, useState } from "react";
import superjson from "superjson";

export default function TrpcProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // TODO: Move these into .env vars?
        httpBatchLink({ url: "http://localhost:4200/api" }), //frontend dev
        httpBatchLink({ url: "https://dj-notes-2.onrender.com/api" }), //prod
      ],
      transformer: superjson,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
