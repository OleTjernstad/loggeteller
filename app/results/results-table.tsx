import { Cache, Log } from "@prisma/client";

import { LogWithPoints } from "./type";

interface ResultsTableProps {
  caches: Cache[];
  logsByName: {
    [key: string]: LogWithPoints[];
  };
}

export function ResultsTable({ caches, logsByName }: ResultsTableProps) {
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
                className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                style={{
                  height: "120px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -rotate-90 whitespace-nowrap">
                  {c.gc}
                </div>
              </th>
            ))}
            <th
              className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              style={{
                height: "120px",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -rotate-90 whitespace-nowrap">
                Totalt
              </div>
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
