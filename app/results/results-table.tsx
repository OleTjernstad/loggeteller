import { Cache, Log } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/nb";

interface ResultsTableProps {
  caches: Cache[];
  logs: Log[];
}

interface LogWithPoints {
  name: string;
  point: number;
  gc: string;
}

export function ResultsTable({ caches, logs }: ResultsTableProps) {
  const logsWithPoints = calculatePoints(caches, logs);
  const logsByName = groupPointsBy(logsWithPoints, "name");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Navn
            </th>
            {caches.map((c) => (
              <th
                key={c.gc}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rotate-90 whitespace-nowrap"
              >
                {c.gc}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rotate-90 whitespace-nowrap">
              Totalt
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(logsByName).map(([key, row]) => {
            let points = 0;
            return (
              <tr key={key}>
                <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row[0].name}
                </th>
                {caches.map((c) => {
                  const cache = row.find((r) => r.gc === c.gc);
                  if (cache) {
                    points = points + cache.point;
                  }
                  return (
                    <td
                      key={`${key}-${c.gc}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                    >
                      {cache?.point}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
