import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core pages
import MeetSalman from "./components/MeetSalman";
import Corporate from "./components/Corporate";
import Gallery from "./components/Gallery";
import Legacy from "./components/Legacy";

// Character & Chapters
import Character from "./components/Character";
import IntelligenceChapter from "./components/IntelliganceChapter";
import ConsciousnessChapter from "./components/ConsciousnessChapter";
import CharacterComparison from "./components/CharacterComparison";

// Graphs & Visuals
import EmotionGraph from "./components/EmotionGraph";
import GeniusEquationGraph from "./components/GeniusEquationGraph";
import GraphNavPanel from "./components/GraphNavPanel";
import EmotionalArcs from "./components/EmotionalArcs";
import MentalMomentum from "./components/MentalMomentum";
import EmotionalInertia from "./components/EmotionalInertia";
import MomentumEquation from "./components/MomentumEquation";

// Reflections & Meta
import SocialButterflies from "./components/SocialButterflies";
import MetaphysicalReflections from "./components/MetaphysicalReflections";

// Analyzers & Classifiers
import DisregardedEntities from "./components/DisregardedEntities";
import CriteriaList from "./components/CriteriaList";
import DisregardedClassifier from "./components/DisregardedClassifier";
import SmartAnalyzer from "./components/SmartAnalyzer";
import KarmicCalculator from "./components/KarmicCalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core */}
        <Route path="/" element={<MeetSalman />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/legacy" element={<Legacy />} />

        {/* Character & Chapters */}
        <Route path="/character" element={<Character />} />
        <Route path="/intelligence" element={<IntelligenceChapter />} />
        <Route path="/consciousness" element={<ConsciousnessChapter />} />
        <Route path="/reflections" element={<CharacterComparison />} />

        {/* Graphs & Visuals */}
        <Route path="/emotionalgraph" element={<EmotionGraph />} />
        <Route path="/GeniusEquationGraph" element={<GeniusEquationGraph />} />
        <Route path="/GraphNavPanel" element={<GraphNavPanel />} />
        <Route path="/EmotionalArcs" element={<EmotionalArcs />} />
        <Route path="/MentalMomentum" element={<MentalMomentum />} />
        <Route path="/EmotionalInertia" element={<EmotionalInertia />} />
        <Route path="/MomentumEquation" element={<MomentumEquation />} />

        {/* Reflections & Meta */}
        <Route path="/SocialButterflies" element={<SocialButterflies />} />
        <Route
          path="/MetaphysicalReflections"
          element={<MetaphysicalReflections />}
        />

        {/* Analyzers & Classifiers */}
        <Route path="/DisregardedEntities" element={<DisregardedEntities />} />
        <Route path="/CriteriaList" element={<CriteriaList />} />
        <Route path="/SmartAnalyzer" element={<SmartAnalyzer />} />
        <Route path="/KarmicCalculator" element={<KarmicCalculator />} />
        <Route
          path="/DisregardedClassifier"
          element={<DisregardedClassifier />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
