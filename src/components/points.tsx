import { LogTickets, LogWithPoints } from "../pages/results";

import { CacheData } from "../pages/caches";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface ResultTableProps {
  logsByName: {
    [key: string]: LogWithPoints[];
  };
  caches: CacheData[];
}
export function ResultTable({ logsByName, caches }: ResultTableProps) {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr style={{ lineHeight: "25px" }}>
          <th style={{ borderBottom: "1px solid black" }}>Navn</th>
          {caches.map((c) => (
            <th
              style={{
                fontSize: 7,
                whiteSpace: "nowrap",
                transform: "rotate(90deg)",
                borderBottom: "1px solid black",
              }}
              key={c.gc}
            >
              {c.gc}
            </th>
          ))}
          <th
            style={{
              fontSize: 7,
              whiteSpace: "nowrap",
              transform: "rotate(90deg)",
              borderBottom: "1px solid black",
            }}
          >
            Totalt
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(logsByName).map(([key, row]) => {
          let points = 0;
          return (
            <tr key={key}>
              <th style={{ fontSize: 9, borderBottom: "1px solid black" }}>
                {row[0].name}
              </th>
              {caches.map((c) => {
                const cache = row.find((r) => r.gc === c.gc);
                if (cache) {
                  points = points + cache.point;
                }
                return (
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      textAlign: "end",
                    }}
                    key={`${key}-${c.gc}`}
                  >
                    {cache?.point}
                  </td>
                );
              })}
              <td
                style={{
                  fontSize: 9,
                  borderBottom: "1px solid black",
                  textAlign: "end",
                }}
              >
                {points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
interface TicketListProps {
  tickets: LogTickets[];
}
export function TicketList({ tickets }: TicketListProps) {
  return (
    <List dense>
      {tickets.map((t) => (
        <ListItem key={t.number}>
          <ListItemButton>
            <ListItemIcon>{t.number}</ListItemIcon>
            <ListItemText primary={t.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
