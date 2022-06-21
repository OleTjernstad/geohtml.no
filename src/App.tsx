import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "./components/app-bar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import EditorScreen from "./screens/editor-screen";
import { FileContextProvider } from "./context/file";
import StartScreen from "./screens/start-screen";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a4063",
    },
    secondary: {
      main: "#f76cc6",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 300,
          backgroundColor: "#4a4063",
          color: "#fff",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FileContextProvider>
        <CssBaseline />
        <AppBar />
        <Box sx={{ paddingTop: "70px" }}>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="editor/:id" element={<EditorScreen />} />
          </Routes>
        </Box>
      </FileContextProvider>
    </ThemeProvider>
  );
}

export default App;
