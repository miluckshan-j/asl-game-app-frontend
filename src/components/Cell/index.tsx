import React, { useEffect, useState } from "react";

interface CellProps {
  presentCell: number;
  setPresentCell: Function;
  cellNumber: number;
  cellLetter: string;
  // predictedLetter: string;
  predictions: string[];
  setPredictions: Function;
  word: string;
  isRecording: boolean;
  isCheck: boolean;
}

const Cell = (props: CellProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [cellStyle, setCellStyle] = useState({});
  const [value, setValue] = useState("");

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
      props.predictions.length > 1 &&
      props.isRecording === false
    ) {
      // Get highest occurance
      const predictedLetter = getHighestPrediction(props.predictions);
      if (predictedLetter === "space") {
        // TODO: Give warning message to user
        // Set present cell
        props.setPresentCell(props.presentCell);
      } else {
        // Set value
        setValue(predictedLetter);
        // Skip to next cell
        props.setPresentCell(props.presentCell + 1);
      }
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
    if (value === props.cellLetter) {
      setCellStyle({ backgroundColor: "green" });
      //   Return cell number and predicted letter
    } else if (props.word.includes(value)) {
      setCellStyle({ backgroundColor: "yellow" });
      //   Return cell number and predicted letter
    } else {
      setCellStyle({ backgroundColor: "grey" });
      //   Return cell number and predicted letter
    }
  };

  const getHighestPrediction = (array: string[]) => {
    const maxValue = array.reduce((previous, current, i, arr) =>
      arr.filter((item) => item === previous).length >
      arr.filter((item) => item === current).length
        ? previous
        : current
    );
    return maxValue;
  };

  return (
    <div>
      <input
        type="text"
        name={`cell-${props.cellNumber}`}
        id={`cell-${props.cellNumber}`}
        value={value}
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
