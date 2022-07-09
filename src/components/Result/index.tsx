import React from "react";

import { Box, HStack } from "@chakra-ui/react";

interface ResultProps {
  result: object;
}

const Result = (props: ResultProps) => {
  return (
    <>
      {Object.entries(props?.result).map((key, index) => {
        return (
          <HStack w={"100%"} paddingBottom={2} key={index}>
            {Object.entries(key[1]).map((key: any, index) => {
              return (
                <Box
                  h={["55px", "62.5px", "70px"]}
                  w={"100%"}
                  bg={
                    key[1].guess === "CORRECT_SPOT"
                      ? "#48BB78"
                      : key[1].guess === "WRONG_SPOT"
                      ? "#ECC94B"
                      : "#718096"
                  }
                  border={
                    key[1].guess === "CORRECT_SPOT"
                      ? "1px solid #48BB78"
                      : key[1].guess === "WRONG_SPOT"
                      ? "1px solid #ECC94B"
                      : "1px solid #718096"
                  }
                  key={index}
                ></Box>
              );
            })}
          </HStack>
        );
      })}
    </>
  );
};

export default Result;
