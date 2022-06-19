import { Route, Routes } from "react-router-dom";

import StartScreen from "./screens/start-screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
