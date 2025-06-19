import React from "react";
import './App.css';

const gojuon = [
  ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "ん"],
  ["い", "き", "し", "ち", "に", "ひ", "み", "",   "り", "",   ""],
  ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "",   ""],
  ["え", "け", "せ", "て", "ね", "へ", "め", "",   "れ", "",   ""],
  ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", ""]
];


// 行列を転置する関数
const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) =>
    matrix.map(row => row[colIndex] || "")
  );
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};

function App() {
  const transposed = transpose(gojuon).reverse();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "1rem",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          gap: "0.5rem", // 横の間隔
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {transposed.map((column, colIndex) => (
          <div
            key={colIndex}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: "0.5rem", // 縦の間隔
              alignItems: "center",
            }}
          >
            {column.map((char, rowIndex) => (
              <button
                key={rowIndex}
                disabled={!char}
                onClick={() => speak(char)}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  fontSize: "clamp(1.5rem, 5vw, 8vh)", // ← ボタンサイズに合わせる
                  fontWeight: "bold",
                  backgroundColor: char ? "#f0f0f0" : "transparent",
                  border: char ? "1px solid #ccc" : "none",
                  cursor: char ? "pointer" : "default",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {char}
            </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
