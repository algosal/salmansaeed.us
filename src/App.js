import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetSalman from "./components/MeetSalman";
import Corporate from "./components/Corporate";
import Gallery from "./components/Gallery";
import Legacy from "./components/Legacy";
import Character from "./components/Character";
import IntelligenceChapter from "./components/IntelliganceChapter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MeetSalman />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/character" element={<Character />} />
        <Route path="/intelligence" element={<IntelligenceChapter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
