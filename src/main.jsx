import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="244184705543-74146e067scuc9uoqtgdfhcdhkriq32r.apps.googleusercontent.com">
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </GoogleOAuthProvider>
);
