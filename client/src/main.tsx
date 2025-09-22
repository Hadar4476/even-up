import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

import store from "./store";

// import "@/assets/styles/global.scss";
import "./index.css";
import { Provider } from "react-redux";

import "./locales/i18n"; // Import the i18n instance

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
