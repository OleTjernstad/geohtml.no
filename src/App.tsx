import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import EditorScreen from "./screens/editor-screen";
import { FileContextProvider } from "./context/file";
import StartScreen from "./screens/start-screen";
import { Toaster } from "react-hot-toast";

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
        <Toaster />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="editor/:id" element={<EditorScreen />} />
        </Routes>
      </FileContextProvider>
    </ThemeProvider>
  );
}

export default App;
