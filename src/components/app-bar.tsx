import AppBarMui from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 99 }}
      >
        <Toolbar color="primary" variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBarMui>
      <Drawer
        sx={{ width: 300 }}
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // classes={{
        //   paper: {
        //     width: 300,
        //     backgroundColor: theme.palette.primary.main,
        //   },
        // }}
      >
        <List sx={{ paddingTop: "70px" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary="Åpne" />

              <Chip size="small" label="Ctrl + O" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
