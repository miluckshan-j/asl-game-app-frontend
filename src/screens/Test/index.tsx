import React, { useCallback } from "react";

// Components
import Webcam from "../../components/Webcam";

// Hooks
import { useModel } from "../../hooks/useModel";

// Model
import { ASL_MODEL } from "../../Model";

// TODO: Remove screen after testing
const Test = () => {
  const { isModelLoaded, predictClass } = useModel(ASL_MODEL);

  const onUpdate = useCallback(
    async (image: HTMLCanvasElement) => {
      if (!isModelLoaded) {
        return;
      }
      const detectedClasses = await predictClass(image, 0.75);
      if (detectedClasses) {
        // Add to state
        console.log("PREDICTED CLASSES: ", detectedClasses);
      }
    },
    [isModelLoaded, predictClass]
  );
  return (
    <Webcam
      canvas={{ width: 250, height: 250 }}
      updateInterval={100}
      onUpdate={onUpdate}
    />
  );
};

export default Test;
