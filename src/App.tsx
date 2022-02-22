import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import "./App.css";
import { Caches } from "./pages/caches";

function App() {
  const [page, setPage] = useState<"results" | "caches" | "logs">("caches");
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      <main>
        {page === "results" ? (
          <div />
        ) : page === "caches" ? (
          <Caches />
        ) : page === "logs" ? (
          <div />
        ) : (
          <div />
        )}
      </main>
    </div>
  );
}

export default App;
