import React from "react";
import { createRoot } from "react-dom/client";
import { StateInspector } from "reinspect";
import App from "./App";

let MountedApp = <App />;
if (process.env.NODE_ENV === "development") {
  MountedApp = (
    <StateInspector name="App">
      <App />
    </StateInspector>
  );
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(MountedApp);
