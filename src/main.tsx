import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/surat/:nomor",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <div className="font-primayRegular relative">
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </div>
);
