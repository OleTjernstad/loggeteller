import "dayjs/locale/nb";

import { Card, CardContent } from "../components/card";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { CacheData } from "./caches";
import { LogData } from "./logs";
import { ResultTable } from "../components/points";
import dayjs from "dayjs";
import { useEffectOnce } from "../hooks/useEffectOnce";

export interface LogWithPoints {
  name: string;
  point: number;
  gc: string;
}
export function Results() {
  /**
   * Log data
   */
  const [logs, setLogs] = useState<LogData[]>([]);

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("logs");
    const savedData: LogData[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setLogs(savedData);
  });

  /**
   * Cache Date
   */
  const [caches, setCaches] = useState<CacheData[]>([]);

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("caches");
    const savedData: CacheData[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setCaches(savedData);
  });

  /**
   * Log points data
   */
  const [logsByName, setLogsByName] = useState<{
    [key: string]: LogWithPoints[];
  }>();

  useEffect(() => {
    if (logs.length > 0 && caches.length > 0) {
      let logsWithPoints: LogWithPoints[] = [];
      const sortedLogs = groupBy(logs, "gc");

      for (const cache of caches) {
        logsWithPoints = [
          ...logsWithPoints,
          ...countLogsPrCache(sortedLogs, cache),
        ];
      }
      setLogsByName(groupPointsBy(logsWithPoints, "name"));
    }
  }, [caches, logs]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Legg til logger">
            <CardContent>
              {logsByName && (
                <ResultTable logsByName={logsByName} caches={caches} />
              )}
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

function groupPointsBy(objectArray: LogWithPoints[], property: "name") {
  return objectArray.reduce(function (
    acc: {
      [key: string]: LogWithPoints[];
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

  const logWithPoints: LogWithPoints[] = [];

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
