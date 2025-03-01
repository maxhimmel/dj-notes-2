import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/app";
import SessionProvider from "./auth/sessionProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <SessionProvider>
      <App />
    </SessionProvider>
  </BrowserRouter>
);
