import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GojuonPage from "./page/GojuonPage";
import YesNoPage from "./page/YesNoPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/gojuon" element={<GojuonPage />} />
          <Route path="/yesno" element={<YesNoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// メニュー画面コンポーネント
function Menu() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <h1>メニュー</h1>
      <Link to="/gojuon">
        <button style={menuButtonStyle}>五十音表</button>
      </Link>
      <Link to="/yesno">
        <button style={menuButtonStyle}>はい・いいえ</button>
      </Link>
    </div>
  );
}

const menuButtonStyle = {
  fontSize: "2rem",
  padding: "1rem 2rem",
  borderRadius: "8px",
  border: "2px solid #000",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
};

export default App;
