import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import { CounterContextProvider } from "./Context/CounterContext.jsx";
import { TokenContextProvider } from "./Context/TokenContext.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { WishlistContextProvider } from "./Context/WishlistContext.jsx";


createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        <CounterContextProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </CounterContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  </TokenContextProvider>
);
