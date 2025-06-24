import React from "react";

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};

const YesNoPage = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "2vh",
        left: "2vw",
        width: "96vw",
        height: "96vh",
        display: "flex",
        boxSizing: "border-box",
        overflow: "hidden",
        gap: "2vw", // ボタン間の余白
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#e0f7fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #000",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
        onClick={() => speak("はい")}
      >
        <span
          style={{ fontSize: "clamp(2rem, 8vw, 10rem)", fontWeight: "bold" }}
        >
          はい
        </span>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: "#fce4ec",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #000",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
        onClick={() => speak("いいえ")}
      >
        <span
          style={{ fontSize: "clamp(2rem, 8vw, 10rem)", fontWeight: "bold" }}
        >
          いいえ
        </span>
      </div>
    </div>
  );
};

export default YesNoPage;
