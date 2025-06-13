"use client";

import { Cache, Log } from "@prisma/client";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/nb";

interface WinnerPickerProps {
  caches: Cache[];
  logs: Log[];
}

interface LogWithPoints {
  name: string;
  point: number;
  gc: string;
}

interface LogTickets {
  name: string;
  number: number;
}

export function WinnerPicker({ caches, logs }: WinnerPickerProps) {
  const [firstPlace, setFirstPlace] = useState<number>();
  const [secondPlace, setSecondPlace] = useState<number>();
  const [thirdPlace, setThirdPlace] = useState<number>();
  const [logsTickets, setLogsTickets] = useState<LogTickets[]>([]);

  let ticketNumber = 1;
  let loopPicking = 0;

  function calculatePoints() {
    const onPDay = 3;
    const owner = 3;
    const onWeekend = 2;
    const inDecember = 1;

    const logWithPoints: LogWithPoints[] = [];
    const newLogTickets: LogTickets[] = [];

    const sortedLogs = groupBy(logs, "gc");

    for (const cache of caches) {
      const logs = sortedLogs[cache.gc];
      const publishDate = new Date(cache.date);

      // Points to owner
      logWithPoints.push({ name: cache.owner, gc: cache.gc, point: owner });
      for (let i = 0; i < owner; i++) {
        newLogTickets.push({ name: cache.owner, number: ticketNumber });
        ticketNumber++;
      }

      // Points for logs
      if (logs?.length > 0) {
        for (const log of logs) {
          const logDate = new Date(log.date);

          if (dayjs(publishDate).isSame(logDate, "day")) {
            logWithPoints.push({ name: log.name, gc: log.gc, point: onPDay });
            for (let i = 0; i < onPDay; i++) {
              newLogTickets.push({ name: log.name, number: ticketNumber });
              ticketNumber++;
            }
          } else if (dayjs(publishDate).locale("nb").isSame(logDate, "week")) {
            const dayOfWeek = logDate.getDay();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
              logWithPoints.push({
                name: log.name,
                gc: log.gc,
                point: onWeekend,
              });
              for (let i = 0; i < onWeekend; i++) {
                newLogTickets.push({ name: log.name, number: ticketNumber });
                ticketNumber++;
              }
            }
          } else {
            logWithPoints.push({
              name: log.name,
              gc: log.gc,
              point: inDecember,
            });
            for (let i = 0; i < inDecember; i++) {
              newLogTickets.push({ name: log.name, number: ticketNumber });
              ticketNumber++;
            }
          }
        }
      }
    }

    setLogsTickets(newLogTickets);
    return logWithPoints;
  }

  function pickWinners(place: number) {
    loopPicking = 0;
    const numberIfLoops = Math.floor(Math.random() * 20) + 5;
    switch (place) {
      case 1:
        findFirstPlace(numberIfLoops);
        break;
      case 2:
        findSecondPlace(numberIfLoops);
        break;
      case 3:
        findThirdPlace(numberIfLoops);
        break;
      default:
        break;
    }
  }

  function findFirstPlace(numberIfLoops: number) {
    const myTimeout = setTimeout(() => {
      setFirstPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < numberIfLoops) {
        findFirstPlace(numberIfLoops);
      } else {
        pickWinners(2);
      }
      clearTimeout(myTimeout);
    }, 200);
  }

  function findSecondPlace(numberIfLoops: number) {
    const myTimeout = setTimeout(() => {
      setSecondPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < numberIfLoops) {
        findSecondPlace(numberIfLoops);
      } else {
        pickWinners(3);
      }
      clearTimeout(myTimeout);
    }, 200);
  }

  function findThirdPlace(numberIfLoops: number) {
    const myTimeout = setTimeout(() => {
      setThirdPlace(Math.floor(Math.random() * logsTickets.length));
      loopPicking++;
      if (loopPicking < numberIfLoops) {
        findThirdPlace(numberIfLoops);
      }
      clearTimeout(myTimeout);
    }, 200);
  }

  const NameOfWinner = ({ place }: { place: number }) => {
    const winner = logsTickets.find((l) => l.number === place);
    if (winner) return <>{winner.name}</>;
    return <></>;
  };

  return (
    <div>
      <button
        onClick={() => {
          calculatePoints();
          pickWinners(1);
        }}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden"
      >
        Trekk vinnere
      </button>
      <div className="mt-4">
        {firstPlace !== undefined && (
          <div className="text-4xl">
            1. {firstPlace + 1}: <NameOfWinner place={firstPlace + 1} />
          </div>
        )}
        {secondPlace !== undefined && (
          <div className="text-4xl">
            2. {secondPlace + 1}: <NameOfWinner place={secondPlace + 1} />
          </div>
        )}
        {thirdPlace !== undefined && (
          <div className="text-4xl">
            3. {thirdPlace + 1}: <NameOfWinner place={thirdPlace + 1} />
          </div>
        )}
      </div>
    </div>
  );
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
