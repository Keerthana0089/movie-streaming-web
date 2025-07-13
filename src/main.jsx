import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
    <FavoritesProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </FavoritesProvider>
    </ThemeProvider>
  </Provider>
);
