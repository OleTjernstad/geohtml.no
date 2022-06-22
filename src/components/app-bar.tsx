import AppBarMui from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import { FileTabs } from "./file-tabs";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useFile } from "../context/file";
import { useState } from "react";

export default function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { createNewFile, openExistingFile, files, isEdited } = useFile();

  function newFile() {
    createNewFile();
    setIsDrawerOpen(false);
  }
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
          <FileTabs files={files} isEdited={isEdited} />
        </Toolbar>
      </AppBarMui>
      <Drawer
        sx={{ width: 300 }}
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List sx={{ paddingTop: "70px" }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={newFile}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary="Ny fil" />

              <Chip sx={{ color: "#d3d3d3" }} size="small" label="Ctrl + M" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={openExistingFile}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary="Åpne fil" />

              <Chip sx={{ color: "#d3d3d3" }} size="small" label="Ctrl + O" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
