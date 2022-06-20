import { Route, Routes } from "react-router-dom";

import EditorScreen from "./screens/editor-screen";
import { FileContextProvider } from "./context/file";
import StartScreen from "./screens/start-screen";

function App() {
  return (
    <FileContextProvider>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="editor" element={<EditorScreen />} />
      </Routes>
    </FileContextProvider>
  );
}

export default App;
