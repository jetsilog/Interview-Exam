import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    try {
      await axios.patch("http://localhost:3000/count/1", {
        counter: counter + 1,
      });
      setCounter(counter + 1);
      console.log(`Clicked new counter value: ${counter}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get(" http://localhost:3000/count/1");
        console.log(response);
        setCounter(response.data[0].counter);
        console.log(response.data[0].counter);
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
