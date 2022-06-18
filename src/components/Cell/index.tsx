import React, { useEffect, useState } from "react";

// Model
import { ModelAnswer } from "../../Model";

interface CellProps {
  presentCell: number;
  setPresentCell: Function;
  try: number;
  currentTry: number;
  cellNumber: number;
  cellLetter: string;
  // predictedLetter: string;
  predictions: string[];
  setPredictions: Function;
  word: string;
  isRecording: boolean;
  isCheck: boolean;
  answerHandler: Function;
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
    let answer: ModelAnswer = { cellNumber: props.cellNumber, value: value };
    if (value === props.cellLetter) {
      answer.guess = "CORRECT_SPOT";
    } else if (props.word.includes(value) && value !== "") {
      answer.guess = "WRONG_SPOT";
    } else {
      answer.guess = "NOT_FOUND";
    }
    props.answerHandler(answer);
  }, [value]);

  useEffect(() => {
    if (value !== "") {
      if (props.isCheck && props.presentCell === 5) {
        if (value === props.cellLetter) {
          setCellStyle({ backgroundColor: "green" });
        } else if (props.word.includes(value) && value !== "") {
          setCellStyle({ backgroundColor: "yellow" });
        } else {
          setCellStyle({ backgroundColor: "grey" });
        }
      }
    }
  }, [props.isCheck, props.presentCell]);

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
