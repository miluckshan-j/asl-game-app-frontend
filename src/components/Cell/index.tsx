import React, { useEffect, useState } from "react";

// Model
import { ModelAnswer } from "../../Model";

interface CellProps {
  presentCell: number;
  setPresentCell: Function;
  try: number;
  setTry: Function;
  presentTry: number;
  cellNumber: number;
  cellLetter: string;
  predictions: string[];
  setPredictions: Function;
  word: string;
  predictedResults: any;
  isRecording: boolean;
  isCheck: boolean;
  answerHandler: Function;
}

const Cell = (props: CellProps) => {
  const [cellStyle, setCellStyle] = useState({});
  const [value, setValue] = useState("");

  useEffect(() => {
    if (
      props.cellNumber === props.presentCell &&
      props.try === props.presentTry
    ) {
      setCellStyle({ border: "1px solid red" });
    } else {
      setCellStyle({ border: "1px solid black" });
    }
  }, [props.cellNumber, props.presentCell, props.try, props.presentTry]);

  useEffect(() => {
    if (
      props.cellNumber === props.presentCell &&
      props.try === props.presentTry &&
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
    props.try,
    props.presentTry,
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
    if (Object.keys(props.predictedResults).length > 0) {
      console.log("row ans", props.predictedResults);
      if (props.try < props.presentTry) {
        const guess =
          props.predictedResults[props.try.toString()][
            props.cellNumber.toString()
          ].guess;

        if (guess === "CORRECT_SPOT") {
          setCellStyle({ backgroundColor: "green" });
        } else if (guess === "WRONG_SPOT") {
          setCellStyle({ backgroundColor: "yellow" });
        } else if (guess === "NOT_FOUND") {
          setCellStyle({ backgroundColor: "grey" });
        } else {
          setCellStyle({ backgroundColor: "white" });
        }
      }
    }
  }, [props.presentTry, props.presentCell]);

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
        disabled={true}
      />
    </div>
  );
};

export default Cell;
