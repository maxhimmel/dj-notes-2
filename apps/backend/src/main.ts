import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { z } from 'zod';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    return { id: opts.input, name: 'Bilbo' };
  }),
});

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
app.on('error', console.error);
