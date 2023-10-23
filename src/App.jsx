// client.js
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const socket = socketIOClient("http://localhost:3001");

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    const newCounterValue = counter + 1;
    await axios.patch("http://localhost:3001/counter", {
      newCounterValue,
    });
  };

  useEffect(() => {
    socket.on("counterUpdate", (newCounterValue) => {
      setCounter(newCounterValue);
    });

    const fetchCounter = async () => {
      const response = await axios.get("http://localhost:3001/counter");
      setCounter(response.data.counter);
    };

    fetchCounter();
  }, []);

  return (
    <>
      <p>Counter : {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </>
  );
}

export default App;
