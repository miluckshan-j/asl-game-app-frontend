import React from "react";

import { Box, HStack } from "@chakra-ui/react";

const cellIndices = [0, 1, 2, 3, 4];

const CellRow = () => {
  return (
    <HStack w={"100%"} paddingBottom={2}>
      {cellIndices.map((cellNumber, index) => {
        return (
          <Box
            h={["55px", "62.5px", "70px"]}
            w={"100%"}
            bg={"white"}
            border={"1px solid #CBD5E0"}
          >
            {/* Cell Component */}
          </Box>
        );
      })}
    </HStack>
  );
};

export default CellRow;
