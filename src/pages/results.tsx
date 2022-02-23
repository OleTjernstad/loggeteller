import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/card";
import { LogTable } from "../components/logs";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { CacheData } from "./caches";
import { LogData } from "./logs";

export function Results() {
  const [logs, setLogs] = useState<LogData[]>([]);
  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("logs");
    const savedData: LogData[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setLogs(savedData);
  });

  const [caches, setCaches] = useState<CacheData[]>([]);

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("caches");
    const savedData: CacheData[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setCaches(savedData);
  });

  useEffect(() => {
    if (logs.length > 0 && caches.length > 0) {
      const sortedLogs = groupBy(logs, "gc");

      for (const cache of caches) {
        countLogsPrCache(sortedLogs, cache);
      }
    }
  }, [caches, logs]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Legg til logger">
            <CardContent>
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

function groupBy(objectArray: LogData[], property: "gc") {
  return objectArray.reduce(function (
    acc: {
      [key: string]: LogData[];
    },
    obj
  ) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function countLogsPrCache(
  sortedLogs: { [key: string]: LogData[] },
  cache: CacheData
) {
  const onPDay = 3;
  const owner = 3;
  const onWeekend = 2;
  const inDecember = 1;

  const logs = sortedLogs[cache.gc];

  const publishDate = new Date(Date.parse(cache.date));

  for (const log of logs) {
    const logDate = new Date(Date.parse(log.date));

    if (logDate === publishDate) {
      // add onPDay
    }
  }
}
