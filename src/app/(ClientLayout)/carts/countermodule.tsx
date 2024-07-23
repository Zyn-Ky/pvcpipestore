"use client";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export default function CounterModule() {
  const [product1counter, setproduct1counter] = useState(0);

  return (
    <>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={() => setproduct1counter((i) => i + 1)}>+</Button>
        <Button disabled>{product1counter}</Button>
        <Button onClick={() => setproduct1counter((i) => Math.max(i - 1, 0))}>
          -
        </Button>
      </ButtonGroup>
    </>
  );
}
