import { Route, Routes } from "react-router-dom";

import { FileContextProvider } from "./context/file";
import StartScreen from "./screens/start-screen";

function App() {
  return (
    <FileContextProvider>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </FileContextProvider>
  );
}

export default App;
