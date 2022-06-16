import React, { useEffect, useState } from "react";

// Components
import Prediction from "../../components/Prediction";
import Cell from "../../components/Cell";

// TODO: Remove screen after testing
const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [predictions, setPredictions] = useState([""]);
  const [presentCell, setPresentCell] = useState(0);
  const [word, setWord] = useState("PRIMO");
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (isRecording) {
      let startTime = new Date().getTime();
      const interval = setInterval(() => {
        if (new Date().getTime() - startTime > 5000) {
          setIsRecording(false);
          clearInterval(interval);
          return;
        }
      }, 1000);
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      setPredictions((oldArray) => [...oldArray, predictedLetter]);
    }
  }, [isRecording, predictedLetter]);

  return (
    <>
      <Prediction
        isRecording={isRecording}
        predictedLetter={predictedLetter}
        setPredictedLetter={setPredictedLetter}
      />
      <button onClick={() => setIsRecording(true)}>Press</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "25px 0px",
        }}
      >
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={0}
          cellLetter="P"
          // predictedLetter="P"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={1}
          cellLetter="R"
          // predictedLetter="R"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={2}
          cellLetter="I"
          // predictedLetter="I"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={3}
          cellLetter="M"
          // predictedLetter="M"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={4}
          cellLetter="O"
          // predictedLetter="O"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
        />
      </div>
      <button onClick={() => setIsCheck(!isCheck)}>Check</button>
    </>
  );
};

export default Test;
