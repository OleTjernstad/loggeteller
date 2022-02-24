import "dayjs/locale/nb";

import { Card, CardContent } from "../components/card";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { CacheData } from "./caches";
import { LogData } from "./logs";
import { LogTable } from "../components/logs";
import dayjs from "dayjs";
import { useEffectOnce } from "../hooks/useEffectOnce";

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
        console.log(countLogsPrCache(sortedLogs, cache));
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

  const logWithPoints: { name: string; point: number; gc: string }[] = [];

  const logs = sortedLogs[cache.gc];

  const publishDate = new Date(Date.parse(cache.date));

  for (const log of logs) {
    const logDate = new Date(Date.parse(log.date));

    if (dayjs(publishDate).isSame(logDate, "day")) {
      logWithPoints.push({ name: log.name, gc: log.gc, point: onPDay });
    } else if (dayjs(publishDate).locale("nb").isSame(logDate, "week")) {
      const dayOfWeek = logDate.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        logWithPoints.push({ name: log.name, gc: log.gc, point: onWeekend });
      }
    } else {
      logWithPoints.push({ name: log.name, gc: log.gc, point: inDecember });
    }
  }
  return logWithPoints;
}
