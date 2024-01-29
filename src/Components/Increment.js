import React, { useEffect, useState } from "react";
import useCounter from "./Utilities/use-counter";

function Increment() {
  let counter = useCounter();

  return <div className="counter-value increment">{counter}</div>;
}

export default Increment;
