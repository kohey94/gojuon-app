mport React, { useState, useRef } from "react";
import "./App.css";

const gojuon = [
  ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "ん"],
  ["い", "き", "し", "ち", "に", "ひ", "み", "", "り", "", ""],
  ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "", ""],
  ["え", "け", "せ", "て", "ね", "へ", "め", "", "れ", "", ""],
  ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", ""],
];

const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex] || "")
  );
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};

const commonButtonStyle = {
  width: "100%",
  aspectRatio: "1 / 1",
  fontSize: "clamp(1rem, 3.5vw, 6vh)",
  fontWeight: "bold",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  const [inputText, setInputText] = useState("");
  const pressTimer = useRef(null);
  const transposed = transpose(gojuon).reverse();

  const handleSpecialInput = (type) => {
    if (!inputText) return;

    const lastChar = inputText.slice(-1);
    const base = inputText.slice(0, -1);

    const dakutenMap = {
      か: "が", き: "ぎ", く: "ぐ", け: "げ", こ: "ご",
      さ: "ざ", し: "じ", す: "ず", せ: "ぜ", そ: "ぞ",
      た: "だ", ち: "ぢ", つ: "づ", て: "で", と: "ど",
      は: "ば", ひ: "び", ふ: "ぶ", へ: "べ", ほ: "ぼ",
    };

    const handakutenMap = {
      は: "ぱ", ひ: "ぴ", ふ: "ぷ", へ: "ぺ", ほ: "ぽ",
    };

    const smallMap = {
      あ: "ぁ", い: "ぃ", う: "ぅ", え: "ぇ", お: "ぉ",
      つ: "っ", や: "ゃ", ゆ: "ゅ", よ: "ょ", わ: "ゎ",
    };

    if (type === "dakuon" && dakutenMap[lastChar]) {
      setInputText(base + dakutenMap[lastChar]);
    } else if (type === "handakuon" && handakutenMap[lastChar]) {
      setInputText(base + handakutenMap[lastChar]);
    } else if (type === "small" && smallMap[lastChar]) {
      setInputText(base + smallMap[lastChar]);
    } else if (type === "choon") {
      setInputText((prev) => prev + "ー");
    }
  };

  const handleDeleteStart = () => {
    pressTimer.current = setTimeout(() => {
      setInputText("");
    }, 600);
  };

  const handleDeleteEnd = () => {
    clearTimeout(pressTimer.current);
  };

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
      {/* 入力エリア */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
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
        <button
          onMouseDown={handleDeleteStart}
          onMouseUp={handleDeleteEnd}
          onMouseLeave={handleDeleteEnd}
          onTouchStart={handleDeleteStart}
          onTouchEnd={handleDeleteEnd}
          onClick={() => setInputText((prev) => prev.slice(0, -1))}
          style={{
            height: "100%",
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
          style={{
            height: "100%",
            padding: "0 1.5rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            border: "2px solid #000",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#fff",
          }}
        >
          再生
        </button>
      </div>

      {/* 五十音 + 特殊列 */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 特殊列1（濁音など） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flex: "0 0 7vw",
            alignItems: "center",
          }}
        >
          <button onClick={() => handleSpecialInput("dakuon")} style={commonButtonStyle}>゛</button>
          <button onClick={() => handleSpecialInput("handakuon")} style={commonButtonStyle}>゜</button>
          <button onClick={() => handleSpecialInput("small")} style={commonButtonStyle}>小</button>
          <button onClick={() => handleSpecialInput("choon")} style={commonButtonStyle}>ー</button>
          <button disabled style={{ ...commonButtonStyle, backgroundColor: "transparent", border: "none" }} />
        </div>

        {/* 特殊列2（記号） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flex: "0 0 7vw",
            alignItems: "center",
          }}
        >
          {["！", "？", "、", "。"].map((symbol, i) => (
            <button
              key={i}
              onClick={() => setInputText((prev) => prev + symbol)}
              style={commonButtonStyle}
            >
              {symbol}
            </button>
          ))}
          <button disabled style={{ ...commonButtonStyle, backgroundColor: "transparent", border: "none" }} />
        </div>

        {/* 五十音列 */}
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
                  ...commonButtonStyle,
                  backgroundColor: char ? "#f0f0f0" : "transparent",
                  border: char ? "1px solid #ccc" : "none",
                  cursor: char ? "pointer" : "default",
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