import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/card";
import { LogDataForm, LogTable } from "../components/logs";
import { useEffectOnce } from "../hooks/useEffectOnce";

export interface LogData {
  gc: string;
  name: string;
  date: string;
}
export function Logs() {
  const [logs, setLogs] = useState<LogData[]>([]);

  function addLog(gc: string, name: string, date: string) {
    setLogs((prev) => {
      return [...prev, { gc, name, date }];
    });
  }

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("logs");
    const savedData: LogData[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setLogs(savedData);
  });
  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Legg til logger">
            <CardContent>
              <LogDataForm addLog={addLog} />
              <br />
              <br />
              <br />
              <LogTable data={logs} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
