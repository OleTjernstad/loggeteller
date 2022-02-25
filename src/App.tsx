import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Caches } from "./pages/caches";
import CssBaseline from "@mui/material/CssBaseline";
import { Logs } from "./pages/logs";
import { Results } from "./pages/results";
import { useState } from "react";
function App() {
  const [page, setPage] = useState<"results" | "caches" | "logs">("logs");
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      <div style={{ flex: 1, alignItems: "center" }}>
        <nav style={{ padding: 5 }}>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => setPage("caches")}>Legg til cacher</Button>
            <Button onClick={() => setPage("logs")}>Legg til logger</Button>
            <Button onClick={() => setPage("results")}>Se resultater</Button>
          </ButtonGroup>
        </nav>
        <main style={{ marginTop: 20 }}>
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
    </div>
  );
}

export default App;
