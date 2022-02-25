import { LogTickets, LogWithPoints } from "../pages/results";

import { CacheData } from "../pages/caches";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface ResultTableProps {
  logsByName: {
    [key: string]: LogWithPoints[];
  };
  caches: CacheData[];
}
export function ResultTable({ logsByName, caches }: ResultTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Navn</TableCell>
            {caches.map((c) => (
              <TableCell key={c.gc}>{c.gc}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(logsByName).map(([key, row]) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0].name}
              </TableCell>
              {caches.map((c) => {
                const cache = row.find((r) => r.gc === c.gc);
                return (
                  <TableCell key={`${key}-${c.gc}`}>{cache?.point}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
