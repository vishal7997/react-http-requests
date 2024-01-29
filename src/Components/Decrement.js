import React, { useEffect, useState } from "react";
import useCounter from "./Utilities/use-counter";

function Decrement() {
  let counter = useCounter(false);

  return <div className="counter-value decrement">{counter}</div>;
}

export default Decrement;
