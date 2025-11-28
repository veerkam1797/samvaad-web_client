import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

const PUBLISHABLE_KEY = "pk_test_Y2hhcm1pbmctYm9hLTI4LmNsZXJrLmFjY291bnRzLmRldiQ"; 

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  );
} else {
  throw new Error('Root element not found');
}
