import React from "react";
import { Box, styled } from "@mui/material";
import Glass from "../modules/Glass";
import StatBarItem from "./StatBarItem";

const StatBars = ({ stat }) => {
  const total =
    stat.length === 1
      ? stat[0].value
      : stat.reduce((sum, v) => sum + v.value, 0);

  return (
    <Glass>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1, 
        }}
      >
        {stat.map((item) => {
          const percent = stat.length === 1 ? 100 : (item.value / total) * 100;

          return (
            <Box
              key={item.label}
              sx={{
                width: `${percent}%`, // ✅ 진짜 비율
              
                boxSizing: "border-box",
                
              }}
            >
              <StatBarItem
                label={item.label}
                color={item.color}
                value={item.value}
                subValue={item.subValue}
              />
            </Box>
          );
        })}
      </Box>
    </Glass>
  );
};

export default StatBars;
