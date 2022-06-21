import React, { useRef } from "react";

// Hooks
import { useWebcam } from "../../hooks/useWebcam";

interface WebcamProps {
  canvas: {
    width: number;
    height: number;
  };
  updateInterval: number;
  isRecording: boolean;
  onUpdate: (image: HTMLCanvasElement) => Promise<void>;
}

const Webcam = (props: WebcamProps) => {
  const webcamDivRef = useRef<HTMLDivElement>(null);

  const { isWebcamReady } = useWebcam({
    canvas: {
      width: props.canvas.width,
      height: props.canvas.height,
      containerRef: webcamDivRef,
    },
    updateInterval: props.updateInterval,
    onUpdate: props.onUpdate,
  });

  return (
    <div
      className="webcam"
      style={{
        width: props.canvas.width,
        height: props.canvas.height,
        border: props.isRecording ? "1px solid #E53E3E" : "1px solid #718096",
      }}
      ref={webcamDivRef}
    >
      {!isWebcamReady && (
        <span className="blink-slow">{"Waiting for camera permission..."}</span>
      )}
    </div>
  );
};

export default Webcam;
