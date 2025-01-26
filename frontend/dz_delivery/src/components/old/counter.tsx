import React from "react";
import { Button, Typography } from "@mui/material";

interface CounterProps {
  initialCount?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = React.useState(initialCount);

  return (
    <div>
      <Typography variant="h6">Count: {count}</Typography>
      <Button onClick={() => setCount(count + 1)} variant="contained">
        Increment
      </Button>
      <Button onClick={() => setCount(count - 1)} variant="contained">
        Decrement
      </Button>
    </div>
  );
};
