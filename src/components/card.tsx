import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import React from "react";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface CardProps {
  children: React.ReactNode;
  title: string;
  menu?: React.ReactNode;
}
export const Card = ({ children, title, menu }: CardProps) => {
  return (
    <Paper
      style={{ display: "flex", overflow: "auto", flexDirection: "column" }}
    >
      <Toolbar style={{ background: "green" }}>
        <Typography
          style={{
            fontWeight: 500,
            color: "#ffffff",
          }}
          variant="h4"
        >
          {title}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {menu !== undefined ? menu : <div />}
      </Toolbar>
      {children}
    </Paper>
  );
};

interface CardMenuItem {
  label: string;
  action?: () => void;
  skip?: boolean;
  icon?: React.ReactNode;
}
interface CardMenuProps {
  items: Array<CardMenuItem>;
  count?: number;
}
export const CardMenu = ({ items, count }: CardMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        style={{
          fontSize: "1.55rem!important",
          fontWeight: 500,
          color: "#ffffff",
        }}
        aria-label="open menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onMouseOver={handleClick}
        onClick={handleClick}
      >
        <MoreVertIcon /> {count !== undefined && `(${count})`}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((ai) => {
          if (ai.skip) {
            return <div key={ai.label} />;
          }
          return (
            <MenuItem key={ai.label}>
              {ai.action !== undefined ? (
                <Button
                  onClick={() => {
                    handleClose();
                    if (ai.action !== undefined) {
                      ai.action();
                    }
                  }}
                  color="primary"
                  startIcon={ai.icon}
                >
                  {ai.label}
                </Button>
              ) : (
                <div />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ padding: 10 }}>{children}</div>;
};
