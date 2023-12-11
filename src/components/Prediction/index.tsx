import React, { useCallback, useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";

// Components
import Webcam from "../Webcam";

// Hooks
import { useModel } from "../../hooks/useModel";

// Model
import { BSL_MODEL } from "../../Model";

interface PredictionProps {
  isRecording: boolean;
  predictedLetter: string;
  setPredictedLetter: Function;
}

const Prediction = (props: PredictionProps) => {
  const { isModelLoaded, predictClass } = useModel(BSL_MODEL);
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
        canvas={{ width: 200, height: 200 }}
        updateInterval={100}
        isRecording={props.isRecording}
        onUpdate={onUpdate}
      />
      <Text fontSize="sm" color={"gray.500"}>
        {props.isRecording
          ? `Predicted: ${predictedClass}`
          : "Press the Record button to start prediction"}
      </Text>
    </>
  );
};

export default Prediction;
