import { Route, Routes } from "react-router-dom";

import AppBar from "./components/app-bar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import EditorScreen from "./screens/editor-screen";
import { FileContextProvider } from "./context/file";
import StartScreen from "./screens/start-screen";

function App() {
  return (
    <FileContextProvider>
      <CssBaseline />
      <AppBar />
      <Box sx={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="editor" element={<EditorScreen />} />
        </Routes>
      </Box>
    </FileContextProvider>
  );
}

export default App;
