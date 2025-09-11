import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetSalman from "./components/MeetSalman";
import Corporate from "./components/Corporate";
import Gallery from "./components/Gallery";
import Legacy from "./components/Legacy";
import Character from "./components/Character";
import IntelligenceChapter from "./components/IntelliganceChapter";
import ConsciousnessChapter from "./components/ConsciousnessChapter";
import CharacterComparison from "./components/CharacterComparison";
import EmotionGraph from "./components/EmotionGraph";
import GeniusEquationGraph from "./components/GeniusEquationGraph";
import GraphNavPanel from "./components/GraphNavPanel";
import SocialButterflies from "./components/SocialButterflies";
import MetaphysicalReflections from "./components/MetaphysicalReflections";
import EmotionalArcs from "./components/EmotionalArcs";
import MentalMomentum from "./components/MentalMomentum";
import EmotionalInertia from "./components/EmotionalInertia";
import MomentumEquation from "./components/MomentumEquation";
import DisregardedEntities from "./components/DisregardedEntities";
import CriteriaList from "./components/CriteriaList";
import DisregardedClassifier from "./components/DisregardedClassifier";
import SmartAnalyzer from "./components/SmartAnalyzer";

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
        <Route path="/consciousness" element={<ConsciousnessChapter />} />
        <Route path="/reflections" element={<CharacterComparison />} />
        <Route path="/emotionalgraph" element={<EmotionGraph />} />
        <Route path="/GeniusEquationGraph" element={<GeniusEquationGraph />} />
        <Route path="/GraphNavPanel" element={<GraphNavPanel />} />
        <Route path="/SocialButterflies" element={<SocialButterflies />} />
        <Route path="/EmotionalArcs" element={<EmotionalArcs />} />
        <Route path="/MentalMomentum" element={<MentalMomentum />} />
        <Route path="/EmotionalInertia" element={<EmotionalInertia />} />
        <Route path="/MomentumEquation" element={<MomentumEquation />} />
        <Route path="/DisregardedEntities" element={<DisregardedEntities />} />
        <Route path="/CriteriaList" element={<CriteriaList />} />
        <Route path="/SmartAnalyzer" element={<SmartAnalyzer />} />
        <Route
          path="/DisregardedClassifier"
          element={<DisregardedClassifier />}
        />

        <Route
          path="/MetaphysicalReflections"
          element={<MetaphysicalReflections />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
