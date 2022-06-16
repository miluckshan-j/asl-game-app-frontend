import React, { useEffect, useState } from "react";

// Components
import Prediction from "../../components/Prediction";
import Cell from "../../components/Cell";

// TODO: Remove screen after testing
const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [presentCell, setPresentCell] = useState(0);
  const [word, setWord] = useState("PRIMO");
  const [isCheck, setIsCheck] = useState(false);

  // useEffect(() => {
  //   console.log("isRecording", isRecording);
  //   console.log("predictedLetter", predictedLetter);
  // }, [isRecording, predictedLetter]);

  useEffect(() => {
    if (isRecording) {
      let startTime = new Date().getTime();
      console.log("Starting interval");
      const interval = setInterval(() => {
        console.log("Interval is running");
        if (new Date().getTime() - startTime > 5000) {
          clearInterval(interval);
          setIsRecording(false);
          console.log("Interval cleared");
          return;
        }
      }, 1000);
    }
  }, [isRecording]);

  return (
    <>
      {/* <Prediction
        isRecording={isRecording}
        predictedLetter={predictedLetter}
        setPredictedLetter={setPredictedLetter}
      /> */}
      <button onClick={() => setIsRecording(true)}>Press</button>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "25px 0px",
        }}
      >
        <Cell
          presentCell={presentCell}
          cellNumber={0}
          cellLetter="P"
          // predictedLetter={predictedLetter}
          predictedLetter="P"
          word={word}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          cellNumber={1}
          cellLetter="R"
          // predictedLetter={predictedLetter}
          predictedLetter="R"
          word={word}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          cellNumber={2}
          cellLetter="I"
          // predictedLetter={predictedLetter}
          predictedLetter="I"
          word={word}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          cellNumber={3}
          cellLetter="M"
          // predictedLetter={predictedLetter}
          predictedLetter="M"
          word={word}
          isCheck={isCheck}
        />
        <Cell
          presentCell={presentCell}
          cellNumber={4}
          cellLetter="O"
          // predictedLetter={predictedLetter}
          predictedLetter="O"
          word={word}
          isCheck={isCheck}
        />
      </div>
      <button onClick={() => setIsCheck(!isCheck)}>Check</button> */}
    </>
  );
};

export default Test;
