import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ImageModalContext from "./context/ImageUpload.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageModalContext>
      <App />
    </ImageModalContext>
  </StrictMode>
);
