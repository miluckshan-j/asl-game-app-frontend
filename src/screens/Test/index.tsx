import React, { useEffect, useState } from "react";

// Components
import Prediction from "../../components/Prediction";

// TODO: Remove screen after testing
const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");

  useEffect(() => {
    console.log("isRecording", isRecording);
    console.log("predictedLetter", predictedLetter);
  }, [isRecording, predictedLetter]);

  return (
    <>
      <Prediction
        isRecording={isRecording}
        predictedLetter={predictedLetter}
        setPredictedLetter={setPredictedLetter}
      />
      <button onClick={() => setIsRecording(!isRecording)}>Press</button>
    </>
  );
};

export default Test;
