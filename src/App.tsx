import { useRef, useState } from "react";

import clickSound from "./assets/click-sound.mp3";

function App() {
  // Current number showing on calculator screen
  const [buffer, setBuffer] = useState("0");
  // Used by = operator to keep doing the same calculation
  const [previousNumber, setPreviousNumber] = useState(0);
  // Previous key pressed by the user
  const [previousKey, setPreviousKey] = useState("");
  // The current operation to apply
  const [operator, setOperator] = useState("");
  // The current total
  const [total, setTotal] = useState(0);

  const audioRef = useRef(new Audio(clickSound));

  const actLikeNumberSymbols = ["%", "√", ".", "±"];
  const resetBufferSymbols = ["+", "-", "*", "÷", "="];

  const handleNumber = (number: string) => {
    // Clear buffer for new inputs
    if (buffer === "0" || resetBufferSymbols.includes(previousKey)) {
      if (previousKey === "=") {
        setTotal(0);
      }
      setBuffer(number);
    } else {
      // Otherwise just append the text to the current buffer
      setBuffer(buffer + number);
    }
  };

  const handleSymbol = (symbol: string) => {
    const nBuff = Number(buffer);
    switch (symbol) {
      case "+":
      case "-":
      case "*":
      case "÷":
        // If previous key is a number
        if (
          !isNaN(Number(previousKey)) ||
          actLikeNumberSymbols.includes(previousKey)
        ) {
          // If the total is already set, calculate the total with the buffer; otherwise, just set total = buffer.
          const result = total ? calculate(total, nBuff, operator) : nBuff;

          setTotal(result);
          setBuffer(String(result));
        }

        // Just switch operator
        setOperator(symbol);
        break;
      case "√":
        const sqrt = Math.sqrt(nBuff);
        if (previousKey === "=") {
          setTotal(sqrt);
        }
        setBuffer(String(sqrt));
        break;
      case "%":
        setBuffer(String(nBuff / 100));
        break;
      case "=":
        // If there is no total, it means the user clicked a number and clicked = right after
        // In this case we want to store the number to the total
        if (!total) {
          setTotal(nBuff);
          return;
        }

        // This means that the user selected a number and did nothing with it, so the operation cant be re-done
        if (!operator) return;

        // If key pressed before is a number, store current buffer
        if (!isNaN(Number(previousKey))) {
          setPreviousNumber(nBuff);
        }

        // Re-do previous operation if last key is =, otherwise just calculate the pending operation
        const result =
          previousKey === "="
            ? calculate(total, previousNumber, operator)
            : calculate(total, nBuff, operator);

        setTotal(result);
        setBuffer(String(result));
        break;
      case "CE":
        setTotal(0);
        setOperator("");
        setBuffer("0");
        setPreviousNumber(0);
        break;

      case ".":
        if (!buffer.includes(".")) setBuffer(buffer + ".");
        else if (buffer.endsWith("."))
          setBuffer(buffer.slice(0, buffer.length - 1));
        break;
      case "±":
        if (!buffer.startsWith("-")) setBuffer("-" + buffer);
        else setBuffer(buffer.slice(1, buffer.length));
        break;
    }
  };

  const calculate = (n1: number, n2: number, operation: string) => {
    switch (operation) {
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
      case "*":
        return n1 * n2;
      case "÷":
        return n1 / n2;
      default:
        return 0;
    }
  };

  const Key = ({ value }: { value: string }) => {
    return (
      <button
        className={`bg-pink-400 hover:brightness-95 rounded-md transition-colors duration-100 active:transform active:scale-95 text-xs uppercase ${
          value === "+" && "row-span-2"
        }`}
        onClick={() => {
          if (audioRef.current) {
            const audio = audioRef.current;
            audio.pause();
            audio.currentTime = 0;
            audio.play();
          }

          !isNaN(Number(value)) ? handleNumber(value) : handleSymbol(value);

          setPreviousKey(value);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <>
      <main className="flex h-screen items-center justify-center bg-pink-400">
        <section className="flex flex-col gap-4 size-80 rounded-xl bg-pink-300 p-4 shadow-md text-pink-100">
          {/* Display */}
          <div className="y-2 w-full rounded-xl bg-pink-200 px-4 text-right font-display text-4xl">
            {buffer}
          </div>

          {/* Keys */}
          <div className="grid grid-cols-6 h-full gap-2">
            <Key value="off" />
            <Key value="7" />
            <Key value="8" />
            <Key value="9" />
            <Key value="%" />
            <Key value="√" />
            <Key value="♪" />
            <Key value="4" />
            <Key value="5" />
            <Key value="6" />
            <Key value="*" />
            <Key value="÷" />
            <Key value="CE" />
            <Key value="1" />
            <Key value="2" />
            <Key value="3" />
            <Key value="+" />
            <Key value="-" />
            <Key value="on" />
            <Key value="0" />
            <Key value="." />
            <Key value="±" />
            <Key value="=" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
