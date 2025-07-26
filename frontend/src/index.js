import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use React 18's new client API
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
