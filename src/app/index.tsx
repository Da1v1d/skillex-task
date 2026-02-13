import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import QueryClientProvider from "@/providers/query-client-provider";
import RouterProvider from "@/providers/router-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  </StrictMode>,
);
