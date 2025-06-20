import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MeetSalman from "./components/MeetSalman";
import Gallery from "./components/Gallery";
import Corporate from "./components/Corporate";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Router context starts here */}

      {/* Mobile-only navbar inside the router */}
      <div className="mobile-navbar">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<MeetSalman />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/corporate" element={<Corporate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
