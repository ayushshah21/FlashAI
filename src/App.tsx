import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import GenerateFlashcardsPage from "./GenerateFlashcardsPage.tsx";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GenerateFlashcardsPage />} />
        {/* Wildcard Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
};

export default App;
