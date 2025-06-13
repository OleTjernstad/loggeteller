"use client";

import "dayjs/locale/nb";

import { Cache, Log } from "@prisma/client";

import { LogWithPoints } from "./type";
import { ResultsTable } from "./results-table";
import { WinnerPicker } from "./winner-picker";
import dayjs from "dayjs";

export interface ResultsTableProps {
  caches: Cache[];
  logs: Log[];
}
export function View({ caches, logs }: ResultsTableProps) {
  const logsWithPoints = calculatePoints(caches, logs);
  const logsByName = groupPointsBy(logsWithPoints, "name");

  return (
    <>
      <WinnerPicker logsByName={logsByName} />
      <div className="mt-8">
        <ResultsTable caches={caches} logsByName={logsByName} />
      </div>
    </>
  );
}

function calculatePoints(caches: Cache[], logs: Log[]): LogWithPoints[] {
  const onPDay = 3;
  const owner = 3;
  const onWeekend = 2;
  const inDecember = 1;

  const logWithPoints: LogWithPoints[] = [];
  const sortedLogs = groupBy(logs, "gc");

  for (const cache of caches) {
    const logs = sortedLogs[cache.gc];
    const publishDate = new Date(cache.date);

    // Points to owner
    logWithPoints.push({ name: cache.owner, gc: cache.gc, point: owner });

    // Points for logs
    if (logs?.length > 0) {
      for (const log of logs) {
        const logDate = new Date(log.date);

        if (dayjs(publishDate).isSame(logDate, "day")) {
          logWithPoints.push({ name: log.name, gc: log.gc, point: onPDay });
        } else if (dayjs(publishDate).locale("nb").isSame(logDate, "week")) {
          const dayOfWeek = logDate.getDay();
          if (dayOfWeek === 6 || dayOfWeek === 0) {
            logWithPoints.push({
              name: log.name,
              gc: log.gc,
              point: onWeekend,
            });
          }
        } else {
          logWithPoints.push({ name: log.name, gc: log.gc, point: inDecember });
        }
      }
    }
  }

  return logWithPoints;
}

function groupBy(objectArray: Log[], property: "gc") {
  return objectArray.reduce(function (
    acc: {
      [key: string]: Log[];
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
