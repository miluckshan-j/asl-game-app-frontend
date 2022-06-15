import React, { useCallback, useEffect, useState } from "react";

// Components
import Webcam from "../Webcam";

// Hooks
import { useModel } from "../../hooks/useModel";

// Model
import { ASL_MODEL } from "../../Model";

interface PredictionProps {
  isRecording: boolean;
  predictedLetter: string;
  setPredictedLetter: Function;
}

const Prediction = (props: PredictionProps) => {
  const { isModelLoaded, predictClass } = useModel(ASL_MODEL);
  const [predictedClass, setPredictedClass] = useState("");

  useEffect(() => {
    if (props.isRecording) {
      props.setPredictedLetter(predictedClass);
    }
  }, [props.isRecording, predictedClass]);

  const onUpdate = useCallback(
    async (image: HTMLCanvasElement) => {
      if (!isModelLoaded) {
        return;
      }
      const detectedClasses = await predictClass(image, 0.75);
      if (detectedClasses) {
        setPredictedClass(detectedClasses.className);
      }
    },
    [isModelLoaded, predictClass]
  );
  return (
    <>
      <Webcam
        canvas={{ width: 250, height: 250 }}
        updateInterval={100}
        onUpdate={onUpdate}
      />
      <p>{predictedClass}</p>
    </>
  );
};

export default Prediction;
