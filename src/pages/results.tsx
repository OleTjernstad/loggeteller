import "dayjs/locale/nb";

import { Button, Container, Grid, Typography } from "@mui/material";
import { Card, CardContent } from "../components/card";
import { ResultTable, TicketList } from "../components/points";
import { useEffect, useState } from "react";

import { CacheData } from "./caches";
import { LogData } from "./logs";
import dayjs from "dayjs";
import { useEffectOnce } from "../hooks/useEffectOnce";

export interface LogWithPoints {
  name: string;
  point: number;
  gc: string;
}
export interface LogTickets {
  name: string;
  number: number;
}
let ticketNumber = 1;
let loopPicking = 0;
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

  const [logsTickets, setLogsTickets] = useState<LogTickets[]>([]);

  useEffect(() => {
    if (logs.length > 0 && caches.length > 0) {
      let logsWithPoints: LogWithPoints[] = [];

      const sortedLogs = groupBy(logs, "gc");

      for (const cache of caches) {
        const { logTickets, logWithPoints } = countLogsPrCache(
          sortedLogs,
          cache
        );
        logsWithPoints = [...logsWithPoints, ...logWithPoints];
        setLogsTickets((prev) => {
          return [...prev, ...logTickets];
        });
      }
      setLogsByName(groupPointsBy(logsWithPoints, "name"));
    }
  }, [caches, logs]);

  const [firstPlace, setFirstPlace] = useState<number>();
  const [secondPlace, setSecondPlace] = useState<number>();
  const [thirdPlace, setThirdPlace] = useState<number>();

  function pickWinners(place: number) {
    loopPicking = 0;
    switch (place) {
      case 1:
        findFirstPlace();
        break;
      case 2:
        findSecondPlace();
        break;
      case 3:
        findThirdPlace();
        break;

      default:
        break;
    }
  }

  function findFirstPlace() {
    const myTimeout = setTimeout(() => {
      setFirstPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < 10) {
        findFirstPlace();
      } else {
        pickWinners(2);
      }

      clearTimeout(myTimeout);
    }, 500);
  }
  function findSecondPlace() {
    const myTimeout = setTimeout(() => {
      setSecondPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < 10) {
        findSecondPlace();
      } else {
        pickWinners(3);
      }

      clearTimeout(myTimeout);
    }, 500);
  }
  function findThirdPlace() {
    const myTimeout = setTimeout(() => {
      setThirdPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < 10) {
        findThirdPlace();
      }
      clearTimeout(myTimeout);
    }, 500);
  }

  const NameOfWinner = ({ place }: { place: number }) => {
    const winner = logsTickets.find((l) => l.number === place);
    if (winner) return <>{winner.name}</>;
    return <></>;
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Resultater">
            <CardContent>
              <Button
                className="noprint"
                onClick={() => pickWinners(1)}
                variant="outlined"
                fullWidth
              >
                Trekk vinnere
              </Button>
              <br />
              {firstPlace !== undefined && (
                <Typography>
                  1. {firstPlace + 1}: <NameOfWinner place={firstPlace + 1} />
                </Typography>
              )}
              <br />
              {secondPlace !== undefined && (
                <Typography>
                  2. {secondPlace + 1}: <NameOfWinner place={secondPlace + 1} />
                </Typography>
              )}
              <br />
              {thirdPlace !== undefined && (
                <Typography>
                  3. {thirdPlace + 1}: <NameOfWinner place={thirdPlace + 1} />
                </Typography>
              )}
              <br />
              {logsByName && (
                <ResultTable logsByName={logsByName} caches={caches} />
              )}
              <br />
              <br />
              <TicketList tickets={logsTickets} />
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
  const logTickets: LogTickets[] = [];

  const logs = sortedLogs[cache.gc];

  const publishDate = new Date(Date.parse(cache.date));

  /**
   * Points to owner
   */
  logWithPoints.push({ name: cache.owner, gc: cache.gc, point: owner });
  for (let i = 0; i < owner; i++) {
    logTickets.push({ name: cache.owner, number: ticketNumber });
    ticketNumber++;
  }

  /**
   * Points for logs
   */
  if (logs?.length > 0) {
    for (const log of logs) {
      const logDate = new Date(Date.parse(log.date));

      if (dayjs(publishDate).isSame(logDate, "day")) {
        logWithPoints.push({ name: log.name, gc: log.gc, point: onPDay });
        for (let i = 0; i < onPDay; i++) {
          logTickets.push({ name: log.name, number: ticketNumber });
          ticketNumber++;
        }
      } else if (dayjs(publishDate).locale("nb").isSame(logDate, "week")) {
        const dayOfWeek = logDate.getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
          logWithPoints.push({ name: log.name, gc: log.gc, point: onWeekend });
          for (let i = 0; i < onWeekend; i++) {
            logTickets.push({ name: log.name, number: ticketNumber });
            ticketNumber++;
          }
        }
      } else {
        logWithPoints.push({ name: log.name, gc: log.gc, point: inDecember });
        for (let i = 0; i < inDecember; i++) {
          logTickets.push({ name: log.name, number: ticketNumber });
          ticketNumber++;
        }
      }
    }
  }
  return { logWithPoints, logTickets };
}
