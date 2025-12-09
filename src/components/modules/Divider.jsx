import React from "react";
import { styled } from "@mui/system";

const StyledDivider = styled("hr")({
  width: "95%",
  height: "10px",
  opacity: 0.5,
  backgroundColor: "#FFFFFF",
  margin: "0",
  borderRadius: "10px",
});

const CustomDivider = () => {
  return (
    // <DividerContainer>
    <StyledDivider />
    // </DividerContainer>
  );
};

export default CustomDivider;
