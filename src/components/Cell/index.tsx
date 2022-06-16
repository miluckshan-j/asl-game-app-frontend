import React, { useEffect, useState } from "react";

interface CellProps {
  presentCell: number;
  cellNumber: number;
  cellLetter: string;
  predictedLetter: string;
  predictions: string[];
  setPredictions: Function;
  word: string;
  isRecording: boolean;
  isCheck: boolean;
}

const Cell = (props: CellProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [cellStyle, setCellStyle] = useState({});

  useEffect(() => {
    if (props.cellNumber === props.presentCell) {
      setIsDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (props.cellNumber === props.presentCell) {
      setIsDisabled(false);
    }
  }, [props.presentCell]);

  useEffect(() => {
    if (
      props.cellNumber === props.presentCell &&
      props.predictions.length > 0 &&
      props.isRecording === false
    ) {
      // Get highest occurance
      console.log(
        `${props.isRecording} || Cell ${props.cellNumber} - Predictions: ${props.predictions}`
      );
      props.setPredictions([]);
    }
  }, [
    props.cellNumber,
    props.presentCell,
    props.predictions,
    props.isRecording,
  ]);

  useEffect(() => {
    if (props.isCheck) {
      checkAnswer();
    }
  }, [props.isCheck]);

  const checkAnswer = () => {
    if (props.predictedLetter === props.cellLetter) {
      setCellStyle({ backgroundColor: "green" });
      //   Return cell number and predicted letter
    } else if (props.word.includes(props.predictedLetter)) {
      setCellStyle({ backgroundColor: "yellow" });
      //   Return cell number and predicted letter
    } else {
      setCellStyle({ backgroundColor: "grey" });
      //   Return cell number and predicted letter
    }
  };

  return (
    <div>
      <input
        type="text"
        name={`cell-${props.cellNumber}`}
        id={`cell-${props.cellNumber}`}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "white",
          ...cellStyle,
        }}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Cell;
