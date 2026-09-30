import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

function App(): React.JSX.Element {
  return (
    <main>
      <p className="eyebrow">VOICE → INTENT → CODE → EVIDENCE</p>
      <h1>VoxTrace</h1>
      <p className="lede">
        Local-first verification for voice-driven and AI-assisted development.
      </p>
      <section aria-labelledby="foundation-status">
        <h2 id="foundation-status">Foundation initialized</h2>
        <p>The trusted repository workflow will be built here.</p>
      </section>
    </main>
  );
}

const root = document.querySelector<HTMLDivElement>("#root");

if (!root) throw new Error("Renderer root element was not found.");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

