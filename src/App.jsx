import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    try {
      const newCounterValue = counter + 1;
      await axios.patch("http://localhost:3000/count/1", {
        counter: newCounterValue,
      });
      setCounter(newCounterValue);
      localStorage.setItem("counter", newCounterValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const storedCounter = localStorage.getItem("counter");
    if (storedCounter) {
      setCounter(parseInt(storedCounter, 10));
    }

    const fetchCounter = async () => {
      try {
        const response = await axios.get("http://localhost:3000/count/1");
        setCounter(response.data[0].counter);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCounter();

    const interval = setInterval(fetchCounter, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>Counter : {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </>
  );
}

export default App;
