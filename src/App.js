import React, { useState } from "react";
import "./App.css";

const gojuon = [
  ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "ん"],
  ["い", "き", "し", "ち", "に", "ひ", "み", "", "り", "", ""],
  ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "", ""],
  ["え", "け", "せ", "て", "ね", "へ", "め", "", "れ", "", ""],
  ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", ""],
];

// 行列を転置する関数
const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex] || ""),
  );
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};

function App() {
  const [inputText, setInputText] = useState("");
  const transposed = transpose(gojuon).reverse();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "1rem",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 入力文字列表示エリア */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch", // ← 高さ自動一致
          gap: "1rem",
          marginBottom: "1rem",
          justifyContent: "center",
        }}
      >
        {/* 入力欄 */}
        <div
          style={{
            flex: 1,
            maxWidth: "80vw",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "0.5rem",
            minHeight: "4rem",
            border: "2px solid #000",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          {inputText}
        </div>

        {/* 削除ボタン */}
        <button
          onClick={() => setInputText("")}
          style={{
            height: "100%", // ← stretchに追従
            padding: "0 1.5rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            border: "2px solid #000",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#fff",
          }}
        >
          削除
        </button>
        <button
  onClick={() => speak(inputText)}
  disabled={!inputText}
  style={{
    height: "100%",
    padding: "0 1.5rem",
    fontSize: "1.8rem",
    fontWeight: "bold",
    border: "2px solid #000",
    borderRadius: "8px",
    cursor: inputText ? "pointer" : "not-allowed",
    backgroundColor: inputText ? "#fff" : "#eee",
    color: inputText ? "#000" : "#888",
  }}
>
  再生
</button>
      </div>

      {/* 五十音表 */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "0.5rem",
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
              flex: "0 0 7vw",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            {column.map((char, rowIndex) => (
              <button
                key={rowIndex}
                disabled={!char}
                onClick={() => {
                  setInputText((prev) => prev + char);
                  speak(char);
                }}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  fontSize: "clamp(1rem, 3.5vw, 6vh)", // ← 調整
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
