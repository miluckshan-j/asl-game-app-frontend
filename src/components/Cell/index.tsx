import React, { useEffect, useState } from "react";

import { Box, useToast } from "@chakra-ui/react";

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
  isClear: boolean;
  setIsClear: Function;
  answerHandler: Function;
}

const Cell = (props: CellProps) => {
  const [cellStyle, setCellStyle] = useState({});
  const [value, setValue] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (
      props.cellNumber <= props.presentCell &&
      props.try <= props.presentTry
    ) {
      setCellStyle({ border: "1px solid #4A5568" });
    } else {
      setCellStyle({ border: "1px solid #718096" });
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
      if (
        predictedLetter === "space" ||
        predictedLetter === "" ||
        predictedLetter === "del"
      ) {
        toast({
          title: "Illegal character",
          status: "info",
          position: "top",
          duration: 1000,
        });
        props.setPresentCell(props.presentCell);
      } else {
        setValue(predictedLetter);
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
      if (props.try < props.presentTry) {
        const guess =
          props.predictedResults[props.try.toString()][
            props.cellNumber.toString()
          ].guess;

        if (guess === "CORRECT_SPOT") {
          setCellStyle({
            border: "1px solid #48BB78",
            backgroundColor: "#48BB78",
          });
        } else if (guess === "WRONG_SPOT") {
          setCellStyle({
            border: "1px solid #ECC94B",
            backgroundColor: "#ECC94B",
          });
        } else if (guess === "NOT_FOUND") {
          setCellStyle({
            border: "1px solid #718096",
            backgroundColor: "#718096",
          });
        } else {
          setCellStyle({
            border: "1px solid #718096",
            backgroundColor: "white",
          });
        }
      }
    }
  }, [props.presentTry, props.presentCell]);

  useEffect(() => {
    if (props.isClear && props.try === props.presentTry) {
      setCellStyle({ border: "1px solid #718096", backgroundColor: "white" });
      setValue("");
      props.setIsClear(false);
    }
  }, [props.isClear, props.presentTry]);

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
    <Box
      h={["40px", "47.5px", "55px"]}
      w={"100%"}
      bg={"white"}
      border={"1px solid #718096"}
      style={{ ...cellStyle }}
    >
      <input
        type="text"
        name={`cell-${props.cellNumber}`}
        id={`cell-${props.cellNumber}`}
        value={value}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          font: "bold 20px Raleway, Helvetica, sans-serif",
          color: "#2D3748",
          textAlign: "center",
        }}
        disabled={true}
      />
    </Box>
  );
};

export default Cell;
