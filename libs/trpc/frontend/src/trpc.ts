import type { AppRouter } from "@trpc/backend";
import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({ url: "http://localhost:3333" }),
//     httpBatchLink({ url: "http://localhost:4200" }),
//   ],
// });
