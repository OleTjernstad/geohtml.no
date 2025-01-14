import AppBarMui from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { FileTabs } from "./file-tabs";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useFile } from "../context/file";
import { useState } from "react";
interface AppBarProps {
  id?: string;
}
export default function AppBar({ id }: AppBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const {
    createNewFile,
    openExistingFile,
    saveFile,
    saveFileAs,
    openFileFromMemory,
    files,
    isEdited,
    lastFiles,
  } = useFile();

  function newFile() {
    createNewFile();
    setIsDrawerOpen(false);
  }
  function openFile() {
    openExistingFile();
    setIsDrawerOpen(false);
  }
  function save() {
    if (id) {
      saveFile(id);
      setIsDrawerOpen(false);
    }
  }
  function saveAs() {
    if (id) {
      saveFileAs(id);
      setIsDrawerOpen(false);
    }
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
              onClick={openFile}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary="Åpne fil" />

              <Chip sx={{ color: "#d3d3d3" }} size="small" label="Ctrl + O" />
            </ListItemButton>
          </ListItem>
          {id && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={save}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText primary="Lagre" />

                  <Chip
                    sx={{ color: "#d3d3d3" }}
                    size="small"
                    label="Ctrl + S"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={saveAs}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText primary="Lagre som" />

                  <Chip
                    sx={{ color: "#d3d3d3" }}
                    size="small"
                    label="Ctrl + Shift +S"
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <Box
            sx={{
              paddingTop: 8,
            }}
          >
            {lastFiles && lastFiles.length > 0 && (
              <>
                <ListSubheader>Siste filer</ListSubheader>
                {lastFiles.map((f) => {
                  const edited = new Date(f.lastEdited);
                  return (
                    <div key={f.id}>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => openFileFromMemory(f)}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText primary={f.name} />

                          <span style={{ fontSize: "0.62rem" }}>
                            {edited.toLocaleString()}
                          </span>
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </>
            )}
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}
