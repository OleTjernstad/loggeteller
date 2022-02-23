import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import "./App.css";
import { Caches } from "./pages/caches";
import { Logs } from "./pages/logs";
import { Results } from "./pages/results";

function App() {
  const [page, setPage] = useState<"results" | "caches" | "logs">("logs");
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      <main>
        {page === "results" ? (
          <Results />
        ) : page === "caches" ? (
          <Caches />
        ) : page === "logs" ? (
          <Logs />
        ) : (
          <div />
        )}
      </main>
    </div>
  );
}

export default App;
