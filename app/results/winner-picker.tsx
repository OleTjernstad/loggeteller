"use client";

import "dayjs/locale/nb";

import { Cache, Log } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { LogWithPoints } from "./type";
import dayjs from "dayjs";

interface WinnerPickerProps {
  logsByName: {
    [key: string]: LogWithPoints[];
  };
}

interface LogTickets {
  name: string;
  number: number;
}

export function WinnerPicker({ logsByName }: WinnerPickerProps) {
  const [firstPlace, setFirstPlace] = useState<number>();
  const [secondPlace, setSecondPlace] = useState<number>();
  const [thirdPlace, setThirdPlace] = useState<number>();
  const [logsTickets, setLogsTickets] = useState<LogTickets[]>([]);

  useEffect(() => {
    setLogsTickets(
      Object.entries(logsByName).map(([name, logs]) => ({
        name,
        number: logs.length,
      }))
    );
  }, [logsByName]);

  const loopPicking = useRef(0);

  function pickWinners(place: number) {
    loopPicking.current = 0;
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
      loopPicking.current++;
      if (loopPicking.current < numberIfLoops) {
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
      loopPicking.current++;
      if (loopPicking.current < numberIfLoops) {
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
      loopPicking.current++;
      if (loopPicking.current < numberIfLoops) {
        findThirdPlace(numberIfLoops);
      }
      clearTimeout(myTimeout);
    }, 200);
  }

  const NameOfWinner = ({ place }: { place: number }) => {
    const winner = logsTickets.find((l) => l.number === place);
    console.log({ place, winner, logsTickets });
    if (winner) return <>{winner.name}</>;
    return <></>;
  };

  return (
    <div>
      <button
        onClick={() => {
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
